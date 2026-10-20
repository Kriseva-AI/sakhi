import { useCallback, useEffect, useRef, useState } from "react";
import { Mic, Square, Trash2 } from "lucide-react";

const AUDIO_LIMIT = 10 * 1024 * 1024;
const VIDEO_LIMIT = 20 * 1024 * 1024;
const MAX_RECORD_MS = 120_000;
type Preview = { url: string; kind: "audio" | "video"; recorded: boolean };

function stopPlayback(media: HTMLMediaElement | null) {
  if (!media) return;
  media.pause();
  media.removeAttribute("src");
  media.load();
}

/** Acquisition and playback only. There is deliberately no upload/ASR endpoint. */
export function LocalMedia({
  adult,
  onClose,
}: {
  adult: boolean;
  onClose: () => void;
}) {
  const [preview, setPreview] = useState<Preview>();
  const [recording, setRecording] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [status, setStatus] = useState("");
  const generation = useRef(0);
  const stream = useRef<MediaStream | null>(null);
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const bytes = useRef(0);
  const url = useRef<string | null>(null);
  const player = useRef<HTMLMediaElement | null>(null);
  const bindPlayer = useCallback((node: HTMLMediaElement | null) => {
    if (player.current !== node) stopPlayback(player.current);
    player.current = node;
    // React's development ref replay performs cleanup then setup on the same
    // element. Restore only the currently active local preview, never a revoked one.
    if (node && url.current && node.getAttribute("src") !== url.current)
      node.src = url.current;
  }, []);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const expiryTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const playbackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const input = useRef<HTMLInputElement>(null);

  function discard(message = "Preview cleared from app memory.") {
    generation.current++;
    clearTimeout(stopTimer.current);
    clearTimeout(expiryTimer.current);
    clearTimeout(playbackTimer.current);
    const active = recorder.current;
    recorder.current = null;
    if (active && active.state !== "inactive") active.stop();
    stream.current?.getTracks().forEach((track) => track.stop());
    stream.current = null;
    chunks.current = [];
    bytes.current = 0;
    if (url.current) URL.revokeObjectURL(url.current);
    url.current = null;
    stopPlayback(player.current);
    if (input.current) input.current.value = "";
    setPreview(undefined);
    setRecording(false);
    setWaiting(false);
    setStatus(message);
  }

  useEffect(() => {
    const hide = () => discard("Page hidden. Recording and preview cleared.");
    const visibility = () => {
      if (document.hidden) hide();
    };
    window.addEventListener("sakhi:cover", hide);
    window.addEventListener("pagehide", hide);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("sakhi:cover", hide);
      window.removeEventListener("pagehide", hide);
      document.removeEventListener("visibilitychange", visibility);
      discard("");
    };
  }, []);

  function show(
    blob: Blob,
    kind: "audio" | "video",
    attempt: number,
    recorded = false,
  ) {
    if (generation.current !== attempt || document.hidden) return;
    const objectUrl = URL.createObjectURL(blob);
    url.current = objectUrl;
    setPreview({ url: objectUrl, kind, recorded });
    setStatus("Checking local playback. Nothing sent or interpreted.");
    playbackTimer.current = setTimeout(
      () =>
        discard(
          "Local playback could not be checked in time. Try a smaller supported file, text or symbols.",
        ),
      8000,
    );
    expiryTimer.current = setTimeout(
      () => discard("Preview expired after five minutes and was cleared."),
      300_000,
    );
  }

  function pick(file?: File) {
    discard("");
    if (!file || !adult) return;
    const kind = file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("audio/")
        ? "audio"
        : null;
    if (
      !kind ||
      !file.size ||
      file.size > (kind === "video" ? VIDEO_LIMIT : AUDIO_LIMIT)
    ) {
      setStatus(
        "Choose a nonempty audio file up to 10 MiB or video up to 20 MiB. You can use text or symbols instead.",
      );
      return;
    }
    show(file, kind, generation.current);
  }

  async function start() {
    discard("");
    if (!adult) return;
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setStatus(
        "Recording is unavailable in this browser. Choose an existing audio file, text or symbols.",
      );
      return;
    }
    const attempt = generation.current;
    setWaiting(true);
    setStatus("Waiting for your microphone decision. You can cancel.");
    try {
      const acquired = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      if (generation.current !== attempt || document.hidden) {
        acquired.getTracks().forEach((track) => track.stop());
        return;
      }
      stream.current = acquired;
      const mimeType = [
        "audio/webm;codecs=opus",
        "audio/mp4",
        "audio/ogg;codecs=opus",
      ].find((type) => MediaRecorder.isTypeSupported(type));
      const active = new MediaRecorder(
        acquired,
        mimeType ? { mimeType } : undefined,
      );
      recorder.current = active;
      active.ondataavailable = (event) => {
        if (generation.current !== attempt || !event.data.size) return;
        bytes.current += event.data.size;
        if (bytes.current > AUDIO_LIMIT) {
          discard(
            "Recording exceeded 10 MiB and was cleared. Try a shorter note or symbols.",
          );
          return;
        }
        chunks.current.push(event.data);
      };
      active.onerror = () => {
        if (generation.current === attempt)
          discard(
            "Recording failed and was cleared. Try text, symbols or an existing audio file.",
          );
      };
      active.onstop = () => {
        acquired.getTracks().forEach((track) => track.stop());
        if (generation.current !== attempt) return;
        clearTimeout(stopTimer.current);
        stream.current = null;
        recorder.current = null;
        setRecording(false);
        const blob = new Blob(chunks.current, { type: active.mimeType });
        chunks.current = [];
        if (blob.size) show(blob, "audio", attempt, true);
        else
          setStatus(
            "No recording was captured. Try text, symbols or an existing audio file.",
          );
      };
      active.start(250);
      setWaiting(false);
      setRecording(true);
      setStatus(
        "Recording on this device. Stop when ready. Maximum two minutes.",
      );
      stopTimer.current = setTimeout(() => {
        if (active.state === "recording") active.stop();
      }, MAX_RECORD_MS);
    } catch {
      if (generation.current === attempt)
        discard(
          "Microphone was unavailable or permission was declined. Try an existing audio file, text or symbols.",
        );
    }
  }

  function checkDuration(media: HTMLMediaElement, kind: "audio" | "video") {
    if (media.src !== url.current) return;
    clearTimeout(playbackTimer.current);
    // Recorder time/byte bounds are enforced during acquisition. Streamed
    // WebM may report Infinity; file metadata rules cannot validate that stream.
    if (preview?.recorded) {
      setStatus("Local preview ready. Nothing sent or interpreted.");
      return;
    }
    if (
      !Number.isFinite(media.duration) ||
      media.duration <= 0 ||
      media.duration > (kind === "video" ? 60 : 120)
    )
      discard(
        "This file’s duration is unsupported or too long. Use audio up to two minutes or video up to one minute, text or symbols.",
      );
    else setStatus("Local preview ready. Nothing sent or interpreted.");
  }

  return (
    <section
      className="input-workspace"
      aria-label="Private media preview"
      lang="en-IN"
      dir="ltr"
    >
      <h2>Keep a note, on your terms</h2>
      <p>Nothing is uploaded. Preview stays on this page.</p>
      <p>Automatic transcription is not enabled in this build.</p>
      {!adult ? (
        <p className="input-notice">
          First choose whether this is for someone 18 or older. Private media is
          unavailable for under-18 or unspecified age. Text, symbols and public
          support remain available.
        </p>
      ) : (
        <>
          <p className="small-note">
            Avoid intimate material or someone else’s private media. Playback is
            your choice. Existing files remain on your device. Sakhi’s temporary
            preview clears on Hide, leaving the page, backgrounding or after
            five minutes. No inference, sharing or silent recording.
          </p>
          <label htmlFor="local-media">
            Choose an existing audio or video file
          </label>
          <input
            ref={input}
            id="local-media"
            type="file"
            accept="audio/*,video/*"
            onChange={(e) => pick(e.target.files?.[0])}
          />
          <p className="small-note">
            Audio: 2 minutes / 10 MiB. Video: 1 minute / 20 MiB. Unsupported
            formats have text and symbol alternatives.
          </p>
          <div className="input-actions">
            {!recording && !waiting && (
              <button
                className="button quiet"
                type="button"
                onClick={() => void start()}
              >
                <Mic size={18} />
                Record a voice note
              </button>
            )}
            {recording && (
              <button
                className="button primary"
                type="button"
                onClick={() => recorder.current?.stop()}
              >
                <Square size={18} />
                Stop recording
              </button>
            )}
            {waiting && (
              <button
                type="button"
                className="button quiet"
                onClick={() =>
                  discard(
                    "Microphone request cancelled. Any late permission will be discarded.",
                  )
                }
              >
                Cancel microphone request
              </button>
            )}
          </div>
          {preview && (
            <div className="media-preview">
              {preview.kind === "video" ? (
                <video
                  ref={bindPlayer}
                  key={preview.url}
                  src={preview.url}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={(e) =>
                    checkDuration(e.currentTarget, "video")
                  }
                  onError={(event) =>
                    event.currentTarget.src === url.current &&
                    discard(
                      "Video format could not play. Try another format, text or symbols.",
                    )
                  }
                />
              ) : (
                <audio
                  ref={bindPlayer}
                  key={preview.url}
                  src={preview.url}
                  controls
                  preload="metadata"
                  onLoadedMetadata={(e) =>
                    checkDuration(e.currentTarget, "audio")
                  }
                  onError={(event) =>
                    event.currentTarget.src === url.current &&
                    discard(
                      "Audio format could not play. Try another format, text or symbols.",
                    )
                  }
                />
              )}
              <p className="small-note">
                Unsent local preview. Not transcribed or analysed. No download
                or share is created.
              </p>
            </div>
          )}
        </>
      )}
      <p role="status">{status}</p>
      <div className="input-actions">
        <button
          type="button"
          className="button quiet"
          onClick={() => discard()}
        >
          <Trash2 size={16} />
          Clear media
        </button>
        <button
          type="button"
          className="text-button"
          onClick={() => {
            discard();
            onClose();
          }}
        >
          Close media
        </button>
      </div>
      <p className="small-note">
        You can still choose a public concern below without describing what
        happened. To prepare a next step from a note, type only a short,
        non-identifying summary yourself.
      </p>
    </section>
  );
}
