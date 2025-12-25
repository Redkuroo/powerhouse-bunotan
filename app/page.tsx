"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function joinRoom() {
    setMessage("");
    const trimmedName = name.trim();
    const trimmedRoom = roomId.trim();
    if (!trimmedName) {
      setMessage("Please enter your name.");
      return;
    }
    if (!trimmedRoom) {
      setMessage("Please enter a room ID.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: trimmedRoom,
          name: trimmedName,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.error || data.message || "Failed to join.");
      } else {
        setMessage(data.message || "Joined successfully!");
      }
    } catch (e) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Bunotan Login Test</h2>

      <input
        placeholder="Enter room ID"
        value={roomId}
        onChange={e => setRoomId(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Enter your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={joinRoom} disabled={loading || !name.trim() || !roomId.trim()}>
        {loading ? "Joining..." : "Join Room"}
      </button>

      <p>{message}</p>
    </div>
  );
}