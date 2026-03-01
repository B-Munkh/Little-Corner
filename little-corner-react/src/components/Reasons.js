import React, { useState } from "react";

export default function Reasons() {
  const reasons = [
    "You always show that you care about me",
    "You never make me feel like I'm being weird",
    "We can laugh about anything and everything together",
    "Your smile lights up the entire room",
    "Your eyes are filled with warmth and love when you look at me",
    "You make me feel right at home, no matter where we are",
    "You're the one person who I look forward to seeing and talking to everyday",
  ];

  const [index, setIndex] = useState(-1);

  const newReason = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * reasons.length);
    } while (reasons.length > 1 && newIndex === index);
    setIndex(newIndex);
  };

  return (
    <div className="reasons-container">
      <h2>A Few Reasons Why...</h2>
      <p>{index === -1 ? "Click the button to see a reason!" : reasons[index]}</p>
      <button onClick={newReason}>New Reason</button>
    </div>
  );
}