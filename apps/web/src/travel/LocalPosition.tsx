import { useEffect, useRef, useState } from "react";
export interface PositionSnapshot {
  lat: number;
  lon: number;
  accuracy: number;
  at: number;
}
export function LocalPosition({
  demo,
  onPick,
  onClear,
}: {
  demo: boolean;
  onPick: (p: PositionSnapshot) => void;
  onClear: () => void;
}) {
  const [fix, setFix] = useState<PositionSnapshot | null>(null),
    [running, setRunning] = useState(false),
    [notice, setNotice] = useState("Not running. No location shared.");
  const watch = useRef<number | null>(null),
    generation = useRef(0),
    clearSnapshot = useRef(onClear);
  clearSnapshot.current = onClear;
  useEffect(() => {
    if (!fix) return;
    const timer = setTimeout(
      () => {
        setFix(null);
        setNotice(
          "Reading expired. Wait for a fresh reading or stop the location view.",
        );
      },
      Math.max(0, fix.at + 120000 - Date.now()),
    );
    return () => clearTimeout(timer);
  }, [fix]);
  const stop = (text = "Local location view stopped.") => {
    generation.current++;
    if (watch.current !== null)
      navigator.geolocation?.clearWatch(watch.current);
    watch.current = null;
    setFix(null);
    setRunning(false);
    setNotice(text);
  };
  useEffect(() => {
    const revoke = () => {
      stop("Location view stopped and position cleared.");
      clearSnapshot.current();
    };
    const hidden = () => {
      if (document.hidden) revoke();
    };
    window.addEventListener("sakhi:cover", revoke);
    window.addEventListener("sakhi:travel-tool-change", revoke);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      generation.current++;
      if (watch.current !== null)
        navigator.geolocation?.clearWatch(watch.current);
      window.removeEventListener("sakhi:cover", revoke);
      window.removeEventListener("sakhi:travel-tool-change", revoke);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, []);
  function start() {
    stop();
    clearSnapshot.current();
    if (demo || document.hidden) return;
    if (!navigator.geolocation) {
      setNotice(
        "Location unavailable. Choose a public map point or arrange a call instead.",
      );
      return;
    }
    const attempt = ++generation.current;
    setRunning(true);
    setNotice(
      "Waiting for a location reading. Permission is not permission to share.",
    );
    const handle = navigator.geolocation.watchPosition(
      (position) => {
        if (attempt !== generation.current || document.hidden) return;
        const { latitude: lat, longitude: lon, accuracy } = position.coords,
          at = position.timestamp;
        if (
          ![lat, lon, accuracy, at].every(Number.isFinite) ||
          lat < 6 ||
          lat > 37.5 ||
          lon < 68 ||
          lon > 98 ||
          accuracy < 0 ||
          accuracy > 5000 ||
          Date.now() - at > 120000 ||
          at > Date.now() + 10000
        ) {
          setFix(null);
          setNotice(
            "Reading is stale, imprecise or outside this India preview. Choose a public point instead.",
          );
          return;
        }
        setFix({ lat, lon, accuracy: Math.ceil(accuracy), at });
        setNotice("Local reading updated. Nothing shared.");
      },
      () => {
        if (attempt === generation.current)
          stop(
            "Location denied, timed out or unavailable. Choose a public map point or arrange a call instead.",
          );
      },
      { enableHighAccuracy: false, maximumAge: 0, timeout: 8000 },
    );
    if (attempt === generation.current) watch.current = handle;
    else navigator.geolocation.clearWatch(handle);
  }
  return (
    <div className="local-position">
      <h4>Live location on this page</h4>
      <p>
        Optional foreground reading. Your browser or OS may use its own location
        services. Sakhi keeps the reading in page memory. It does not move the
        public map or send it to a person. Closing, hiding or leaving this tool
        stops it.
      </p>
      <p role="status">{notice}</p>
      {!running ? (
        <button className="button quiet" disabled={demo} onClick={start}>
          Start local location view
        </button>
      ) : (
        <button
          className="button quiet"
          onClick={() => {
            stop();
            clearSnapshot.current();
          }}
        >
          Stop and clear local location
        </button>
      )}
      {fix && (
        <>
          <dl className="position-reading">
            <dt>Local position</dt>
            <dd>
              {fix.lat.toFixed(6)}, {fix.lon.toFixed(6)}
            </dd>
            <dt>Accuracy estimate</dt>
            <dd>{fix.accuracy} m</dd>
            <dt>Reading time</dt>
            <dd>{new Date(fix.at).toLocaleString("en-IN")}</dd>
          </dl>
          <button
            className="button quiet"
            onClick={() => {
              if (Date.now() - fix.at > 120000) {
                stop("Reading expired. Request a fresh reading.");
                return;
              }
              onPick(fix);
              stop(
                "One-time position chosen for a draft. Live reading stopped; nothing sent.",
              );
            }}
          >
            Use this one-time position in my update
          </button>
        </>
      )}
      <p className="small-note">
        Location permission does not authorize sharing. Choose a one-time
        position separately, then review recipient and content. This is not a
        background tracker or emergency service.
      </p>
    </div>
  );
}
