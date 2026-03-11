import React, { useEffect, useState } from "react";
import "../App.css";

export default function Timer() {
  const startDate = new Date("2025-02-19T00:00:00");
  const [time, setTime] = useState({
    years: "00",
    months: "00",
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Countdown timer logic
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      let hours = now.getHours() - startDate.getHours();
      let minutes = now.getMinutes() - startDate.getMinutes();
      let seconds = now.getSeconds() - startDate.getSeconds();

      if (seconds < 0) { seconds += 60; minutes--; }
      if (minutes < 0) { minutes += 60; hours--; }
      if (hours < 0) { hours += 24; days--; }
      if (days < 0) {
        const daysInLastMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += daysInLastMonth;
        months--;
      }
      if (months < 0) { months += 12; years--; }

      setTime({
        years: String(years).padStart(2, "0"),
        months: String(months).padStart(2, "0"),
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Generate multiple hearts starting from the bottom of the page
  const createHearts = () => {
    const heartsContainer = document.getElementById("hearts-container");
    if (!heartsContainer) return;
    const numHearts = 30; // number of hearts per click

    for (let i = 0; i < numHearts; i++) {
      const heart = document.createElement("div");
      heart.className = "floating-heart";

      // Random horizontal position across the viewport
      heart.style.left = `${Math.random() * 100}vw`;
      // Always start from the bottom of the viewport
      heart.style.bottom = `${-20 - Math.random() * 60}px`;

      // Random size and animation duration
      const size = 15 + Math.random() * 25; // 15px - 40px
      heart.style.width = `${size}px`;
      heart.style.height = `${size}px`;
      heart.style.setProperty("--heart-size", `${size}px`);
      const duration = 5 + Math.random() * 5; // 5-10 seconds
      heart.style.animationDuration = `${duration}s`;
      heart.style.setProperty("--drift", `${(Math.random() * 2 - 1) * 60}px`);

      heartsContainer.appendChild(heart);

      // Remove heart after animation ends
      heart.addEventListener("animationend", () => {
        heartsContainer.removeChild(heart);
      });
    }
  };

  return (
    <div className="timer-container">
      <h1>Time Together</h1>
      <div className="timer-boxes">
        {Object.entries(time).map(([label, value]) => (
          <div className="time-box" key={label}>
            <div className="number">{value}</div>
            <div className="label">
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </div>
            {label === "seconds" && (
              <button
                className="heart-button"
                type="button"
                onClick={createHearts}
                aria-label="Send hearts"
              >
                ❤️
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Full-page hearts container */}
      <div id="hearts-container"></div>
    </div>
  );
}