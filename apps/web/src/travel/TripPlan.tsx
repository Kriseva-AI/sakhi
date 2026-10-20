import { useEffect, useState } from "react";
import { Check, Download, MessageCircle, Timer } from "lucide-react";
import type { Destination } from "../Modal";
import type { City, Place, Route } from "./types";
import { publicTrip } from "./types";
import { LovedOneUpdate } from "./LovedOneUpdate";
const CHECKS = [
  "Choose a public meeting point",
  "Check transport with the operator",
  "Agree a check-in with someone I choose",
  "Keep emergency information available",
];
export function TripPlan({
  city,
  place,
  route,
  demo,
  open,
  onReminder,
}: {
  city: City;
  place: Place | null;
  route: Route | null;
  demo: boolean;
  open: (d: Destination) => void;
  onReminder: (text: string | null) => void;
}) {
  const [checks, setChecks] = useState<string[]>([]),
    [minutes, setMinutes] = useState("15"),
    [deadline, setDeadline] = useState<number | null>(null),
    [now, setNow] = useState(Date.now()),
    [downloaded, setDownloaded] = useState(false);
  useEffect(() => {
    if (deadline === null) return;
    const tick = () => setNow(Date.now());
    const id = setInterval(tick, 1000);
    document.addEventListener("visibilitychange", tick);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", tick);
    };
  }, [deadline]);
  const due = deadline !== null && now >= deadline;
  const remaining =
    deadline === null ? 0 : Math.max(0, Math.ceil((deadline - now) / 60000));
  useEffect(() => {
    onReminder(
      deadline === null
        ? null
        : due
          ? "Time to check in. No one has been notified."
          : `Page reminder: ${remaining} minutes remaining.`,
    );
  }, [onReminder, deadline, due, remaining]);
  const message =
    "Could we agree a check-in time before I travel? Please reply when you are available. Nothing has been arranged yet.";
  const download = () => {
    const blob = new Blob([publicTrip(city, place, route, checks)], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = "sakhi-public-travel-card.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDownloaded(true);
  };
  return (
    <div className="trip-panel">
      <h2>A little preparation.</h2>
      <p>
        {city.name}
        {place ? ` · ${place.name}` : ""}
      </p>
      <fieldset className="trip-checks">
        <legend>My travel checklist</legend>
        {CHECKS.map((check) => (
          <label key={check}>
            <input
              type="checkbox"
              checked={checks.includes(check)}
              onChange={() =>
                setChecks((v) =>
                  v.includes(check)
                    ? v.filter((c) => c !== check)
                    : [...v, check],
                )
              }
            />
            <span>{check}</span>
          </label>
        ))}
      </fieldset>
      <div className="plan-actions">
        <button className="button primary" disabled={demo} onClick={download}>
          <Download size={17} />
          Save public travel card
        </button>
        <button
          className="button quiet"
          disabled={demo}
          onClick={() =>
            open({
              url: `https://wa.me/?text=${encodeURIComponent(message)}`,
              title: "Ask someone for a check-in",
              kind: "whatsapp",
              fields: [{ label: "Message", value: message }],
              disclosure:
                "WhatsApp receives this neutral text after you open it. Choose the recipient and press Send there. No location, journey or story is included. Sakhi cannot confirm delivery or arrange a check-in.",
            })
          }
        >
          <MessageCircle size={17} />
          Preview check-in message
        </button>
      </div>
      {downloaded && (
        <p role="status" className="small-note">
          Downloaded to your device. Clear session cannot delete the file.
        </p>
      )}
      <LovedOneUpdate open={open} demo={demo} />
      <div className="checkin-box">
        <h3>
          <Timer size={20} /> A reminder for me
        </h3>
        <p className="small-note">
          Only while this page stays open. Locking your phone, closing the page
          or browser sleep can delay or stop it. Nobody is monitoring this timer
          or alerted.
        </p>
        {deadline === null ? (
          <>
            <label htmlFor="checkin-minutes">Remind me in</label>
            <select
              id="checkin-minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </select>
            <button
              className="button quiet"
              disabled={demo}
              onClick={() => {
                setNow(Date.now());
                setDeadline(Date.now() + Number(minutes) * 60000);
              }}
            >
              Start page reminder
            </button>
          </>
        ) : (
          <>
            <p className={due ? "checkin-due" : "checkin-count"} role="status">
              {due
                ? "Time to check in. Contact the person you chose."
                : `${remaining} minute${remaining === 1 ? "" : "s"} until your reminder`}
            </p>
            <button
              className="button primary"
              onClick={() => setDeadline(null)}
            >
              <Check size={17} />
              I’m here. End reminder
            </button>
            <button
              className="button quiet"
              onClick={() => {
                setNow(Date.now());
                setDeadline(Date.now() + 5 * 60000);
              }}
            >
              Remind in 5 minutes
            </button>
            <button className="text-button" onClick={() => setDeadline(null)}>
              Cancel reminder
            </button>
          </>
        )}
      </div>
    </div>
  );
}
