import { useState } from "react";
import { CloudRain, Sunrise, Sunset, Thermometer } from "lucide-react";
import type { Weather } from "./types";
import { daylight, indiaNow } from "./types";
export function Conditions({
  weather,
  expired,
}: {
  weather: Weather | null;
  expired: boolean;
}) {
  const [departure, setDeparture] = useState(indiaNow());
  if (!weather)
    return (
      <p className="workspace-empty">
        Load conditions for the chosen public city to see weather and daylight.
      </p>
    );
  const hours = weather.hours
    .filter((h) => h.time >= weather.current.time)
    .slice(0, 4);
  return (
    <div className="conditions-panel">
      {expired && (
        <p className="notice" role="status">
          Conditions have expired. Refresh before relying on them.
        </p>
      )}
      <div className="weather-reading">
        <Thermometer aria-hidden="true" />
        <strong>
          {weather.current.temperature_2m}°<small>C</small>
        </strong>
        <span>
          Model estimate
          <br />
          {weather.current.time.replace("T", " ")} IST
        </span>
      </div>
      <p>
        Wind {weather.current.wind_speed_10m} km/h · precipitation{" "}
        {weather.current.precipitation} mm
      </p>
      <h3>
        <CloudRain size={19} aria-hidden="true" /> Rain forecast
      </h3>
      <ol className="rain-chart" aria-label="Hourly precipitation probability">
        {hours.map((h) => (
          <li key={h.time}>
            <time>{h.time.slice(11, 16)}</time>
            <span className="rain-bar" aria-hidden="true">
              <span style={{ height: `${Math.max(3, h.rain_probability)}%` }} />
            </span>
            <strong>{h.rain_probability}%</strong>
          </li>
        ))}
      </ol>
      <div className="sun-times">
        <span>
          <Sunrise size={20} aria-hidden="true" />{" "}
          {weather.days[0].sunrise.slice(11)} sunrise
        </span>
        <span>
          <Sunset size={20} aria-hidden="true" />{" "}
          {weather.days[0].sunset.slice(11)} sunset
        </span>
      </div>
      <label htmlFor="departure">Check a departure time (IST)</label>
      <input
        id="departure"
        type="datetime-local"
        value={departure}
        min={`${weather.days[0].date}T00:00`}
        max={`${weather.days.at(-1)!.date}T23:59`}
        onChange={(e) => setDeparture(e.target.value)}
      />
      <p className="daylight-result">
        {expired
          ? "Refresh expired conditions first."
          : daylight(departure, weather.days)}
      </p>
      <p className="small-note">
        Daylight is an astronomical estimate, not a measure of crime, street
        lighting or safety. Weather is a model forecast, not an official
        emergency warning.
      </p>
    </div>
  );
}
