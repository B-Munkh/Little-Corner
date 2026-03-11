import React, { useEffect, useState } from "react";
import { fetchMilestones } from "../api";
import "../App.css";

export default function Milestones() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetchMilestones()
      .then(setMilestones)
      .catch(console.error);
  }, []);

  const parseDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
    // Fallback if API provides a non-ISO string (e.g. "Mar 11, 2026")
    const alt = new Date(Date.parse(value));
    return Number.isNaN(alt.getTime()) ? null : alt;
  };

  const now = new Date();
  const upcoming = (milestones || [])
    .map((m) => ({ ...m, _dateObj: parseDate(m.date) }))
    .filter((m) => m._dateObj && m._dateObj.getTime() >= now.getTime())
    .sort((a, b) => a._dateObj.getTime() - b._dateObj.getTime());

  const next = upcoming[0];
  const daysUntil =
    next && next._dateObj
      ? Math.ceil((next._dateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null;

  return (
    <div className="milestone-container">
      <h2>Next Milestone</h2>
      {next ? (
        <p>
          {daysUntil} days until {next.title}
        </p>
      ) : (
        <p>No upcoming milestones yet</p>
      )}
    </div>
  );
}