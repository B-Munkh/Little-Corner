// src/components/Home.js
import React from "react";
import Timer from "./Timer";
import Reasons from "./Reasons";
import Playlist from "./Playlist";
import Milestones from "./Milestones";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Our Little Corner</h1>
      <Timer />
      <Reasons />
      <Playlist />
      <Milestones />
    </div>
  );
}