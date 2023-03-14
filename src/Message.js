import React from "react";

export default function Message({ restartGame, message }) {
  return (
    <div className="message-container">
      <p className="message-text">{message}</p>

      <button onClick={restartGame} className="play-again-btn">
        PLAY AGAIN
      </button>
    </div>
  );
}
