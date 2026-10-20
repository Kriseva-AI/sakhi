import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, MapPin } from "lucide-react";
import type { Destination } from "../Modal";
import { LocalPosition, type PositionSnapshot } from "./LocalPosition";
const MESSAGES = {
  checkin:
    "Could we agree a check-in time before I travel? Please reply when you are available. Nothing has been arranged yet.",
  arrived: "I have arrived. Please reply when you see this update.",
  changed:
    "My plans have changed. Could we agree a new check-in time? Please reply when you are available.",
};
export function LovedOneUpdate({
  open,
  demo,
}: {
  open: (d: Destination) => void;
  demo: boolean;
}) {
  const [name, setName] = useState(""),
    [phone, setPhone] = useState(""),
    [message, setMessage] = useState<keyof typeof MESSAGES>("checkin");
  const [consent, setConsent] = useState(false),
    [error, setError] = useState(""),
    [opened, setOpened] = useState(false),
    [sent, setSent] = useState(false),
    [reply, setReply] = useState(false),
    [live, setLive] = useState(false);
  const [position, setPosition] = useState<PositionSnapshot | null>(null);
  const [locationSession, setLocationSession] = useState(0);
  const positionText = position
    ? `\nOne-time position: ${position.lat.toFixed(6)}, ${position.lon.toFixed(6)}; accuracy estimate ${position.accuracy} m; recorded ${new Date(position.at).toISOString()}. https://www.openstreetmap.org/?mlat=${position.lat.toFixed(6)}&mlon=${position.lon.toFixed(6)}#map=17/${position.lat.toFixed(6)}/${position.lon.toFixed(6)} This is not a live tracking link.`
    : "";
  const exactMessage = MESSAGES[message] + positionText;
  useEffect(() => {
    if (!position) return;
    const timer = setTimeout(
      () => {
        setPosition(null);
        setConsent(false);
        setError(
          "One-time position expired after two minutes. Choose a fresh reading before preparing another update.",
        );
      },
      Math.max(0, position.at + 120000 - Date.now()),
    );
    return () => clearTimeout(timer);
  }, [position]);
  const resetApproval = () => {
    setConsent(false);
    setOpened(false);
    setSent(false);
    setReply(false);
    setError("");
  };
  const clear = () => {
    resetApproval();
    setName("");
    setPhone("");
    setLive(false);
    setMessage("checkin");
    setPosition(null);
    setLocationSession((s) => s + 1);
  };
  function preview() {
    if (demo) return;
    if (position && Date.now() - position.at > 120000) {
      setPosition(null);
      setConsent(false);
      setError("Position expired. Choose a fresh reading before sharing.");
      return;
    }
    if (!consent) {
      setError(
        "Confirm that you chose this recipient and want to prepare this exact update.",
      );
      return;
    }
    if (!name.trim() || !/^[1-9]\d{7,14}$/.test(phone)) {
      setError(
        "Add a recipient label and 8 to 15 digits including country code, without + or spaces. An active WhatsApp account must be checked by you.",
      );
      return;
    }
    setError("");
    open({
      kind: "whatsapp",
      title: "Review your loved-one update",
      url: `https://wa.me/${phone}?text=${encodeURIComponent(exactMessage)}`,
      fields: [
        { label: "Recipient", value: `${name.trim()} (+${phone})` },
        { label: "Message", value: exactMessage },
        {
          label: "Location",
          value: position
            ? "Only the explicitly chosen one-time position above. Not live tracking. No private story."
            : "No location, map point or private story is included.",
        },
      ],
      disclosure:
        "Opening gives WhatsApp the displayed recipient number and exact message plus normal browser information. An included one-time map link reveals the chosen position to WhatsApp and, if sent, the recipient; opening that link also contacts OpenStreetMap. Confirm the intended chat before pressing Send there. It may reveal your account or phone number. Sakhi cannot see Send, delivery or a reply. Location permission does not authorize sharing. This is not a live tracking link.",
      onOpen: () => setOpened(true),
    });
  }
  return (
    <section className="loved-one-update" aria-label="Loved-one updates">
      <div className="guide-heading">
        <MessageCircle size={24} aria-hidden="true" />
        <div>
          <span className="micro-label">SOMEONE YOU CHOOSE</span>
          <h3>Prepare an update together.</h3>
        </div>
      </div>
      <p>
        Choose someone you want to contact. No contact import, automatic message
        or location sharing. These fields stay in page memory until you approve
        opening WhatsApp.
      </p>
      <label htmlFor="update-name">Recipient label</label>
      <input
        id="update-name"
        value={name}
        maxLength={40}
        autoComplete="off"
        onChange={(e) => {
          resetApproval();
          setName(e.target.value);
        }}
      />
      <label htmlFor="update-phone">WhatsApp number with country code</label>
      <input
        id="update-phone"
        type="tel"
        inputMode="tel"
        autoComplete="off"
        maxLength={15}
        value={phone}
        aria-describedby="update-number-hint"
        onChange={(e) => {
          resetApproval();
          setPhone(e.target.value);
        }}
      />
      <p id="update-number-hint" className="small-note">
        Digits only, including country code. Check the number yourself; Sakhi
        does not verify who owns it.
      </p>
      <label htmlFor="update-message">Update to prepare</label>
      <select
        id="update-message"
        value={message}
        onChange={(e) => {
          resetApproval();
          setMessage(e.target.value as keyof typeof MESSAGES);
        }}
      >
        <option value="checkin">Arrange a check-in</option>
        <option value="arrived">I have arrived</option>
        <option value="changed">My plans changed</option>
      </select>
      <LocalPosition
        key={locationSession}
        demo={demo}
        onPick={(p) => {
          resetApproval();
          setPosition(p);
        }}
        onClear={() => {
          setPosition(null);
          setConsent(false);
        }}
      />
      {position && (
        <div className="chosen-position">
          <strong>One-time position chosen. Not sent.</strong>
          <p>
            {position.lat.toFixed(6)}, {position.lon.toFixed(6)} · accuracy
            estimate {position.accuracy} m. Expires two minutes after the
            reading.
          </p>
          <button
            className="text-button"
            onClick={() => {
              resetApproval();
              setPosition(null);
            }}
          >
            Remove position from update
          </button>
        </div>
      )}
      <blockquote className="update-message">{exactMessage}</blockquote>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            setError("");
          }}
        />
        <span>
          I chose this recipient and want to prepare this exact update.
        </span>
      </label>
      {error && <p role="alert">{error}</p>}
      <button className="button primary" disabled={demo} onClick={preview}>
        Preview this update
        <ArrowRight size={17} />
      </button>
      <dl
        className="update-status"
        aria-label="Actual update status"
        role="status"
      >
        <div>
          <dt>Draft</dt>
          <dd>
            {consent && name && phone
              ? "Prepared locally; nothing sent"
              : "Choose recipient and review content"}
          </dd>
        </div>
        <div>
          <dt>Handoff</dt>
          <dd>
            {opened
              ? "WhatsApp opening requested; app launch unconfirmed"
              : "Not opened"}
          </dd>
        </div>
        <div>
          <dt>Sent</dt>
          <dd>
            {sent
              ? "You reported sending; unverified by Sakhi"
              : "not observed"}
          </dd>
        </div>
        <div>
          <dt>Delivered</dt>
          <dd>Not observed; no delivery connection</dd>
        </div>
        <div>
          <dt>Acknowledged</dt>
          <dd>
            {reply
              ? "You reported a reply; unverified by Sakhi"
              : "Not observed"}
          </dd>
        </div>
      </dl>
      {opened && (
        <div className="guide-choices">
          <button className="button quiet" onClick={() => setSent(true)}>
            I sent it in WhatsApp (my record)
          </button>
          {sent && (
            <button className="button quiet" onClick={() => setReply(true)}>
              They replied (my record)
            </button>
          )}
        </div>
      )}
      <button className="text-button" onClick={clear}>
        Revoke and clear update
      </button>
      <p className="small-note">
        Revoking clears this draft and approval here. It cannot unsend a
        message, remove another app’s copies or stop location sharing there.
        Reload, leaving this page or Clear session discards this record.
      </p>
      <button
        className="button quiet"
        aria-expanded={live}
        onClick={() => setLive(!live)}
      >
        <MapPin size={18} />
        Help me share live location
      </button>
      {live && (
        <div className="live-location-guide">
          <h4>Choose recipient, duration and Send in WhatsApp.</h4>
          <p>
            Location permission does not authorize sharing. Sakhi does not start
            or monitor live sharing. If you choose it in the mobile app:
          </p>
          <ol>
            <li>Open the intended chat and check who can see it.</li>
            <li>
              Choose Attach, Location, then Share live location. Decide whether
              to grant that app location access.
            </li>
            <li>
              Review the recipient and duration there, then choose Send only if
              you want to share.
            </li>
            <li>
              To revoke, open the chat and choose Stop sharing. The last shared
              location may remain visible as a static preview.
            </li>
          </ol>
          <p>
            If this option is unavailable, arrange a call or send a neutral
            check-in instead. Device, network and background limits can
            interrupt updates. This is not rescue monitoring.
          </p>
          <button
            className="text-button"
            onClick={() =>
              open({
                url: "https://faq.whatsapp.com/480865177351335/",
                title: "WhatsApp live-location instructions",
              })
            }
          >
            Preview WhatsApp instructions
          </button>
          <p className="small-note">
            Provider instructions checked 2026-10-20. Review by 2026-11-19.
            Human review pending. No institutional connection.
          </p>
        </div>
      )}
    </section>
  );
}
