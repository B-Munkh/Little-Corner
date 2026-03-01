import React from "react";
import "../App.css"; // 

export default function Playlist() {
  return (
    <div className="playlist-container">
      <h2>Our Playlist</h2>
      <iframe
        data-testid="embed-iframe"
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/7wekSU58dEJPcKHhjVz1zP?utm_source=generator"
        width="100%"
        height="100%"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      ></iframe>
    </div>
  );
}