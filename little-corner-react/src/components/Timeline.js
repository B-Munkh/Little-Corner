import React, { useEffect, useState } from "react";
import { fetchMilestones } from "../api";
import "./App.css";

export default function Milestones() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    fetchMilestones().then(setMilestones).catch(console.error);
  }, []);

  return (
    <div className="milestone-container">
      {milestones.map((m) => (
        <div key={m.id}>
          <h2>{m.title}</h2>
          <p>{m.date}</p>
        </div>
      ))}
    </div>
  );
}