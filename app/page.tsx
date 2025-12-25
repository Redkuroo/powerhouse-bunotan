"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  async function joinRoom() {
    setMessage("");

    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        roomId: "test-room",
        name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
    } else {
      setMessage("Joined successfully!");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Bunotan Login Test</h2>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={joinRoom}>Join Room</button>

      <p>{message}</p>
    </div>
  );
}