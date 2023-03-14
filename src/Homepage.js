import React, { useEffect } from "react";

export default function Homepage({ startGame, highscoreData }) {
  return (
    <div>
      {highscoreData ? (
        highscoreData.length > 0 && (
          <div className="homepage">
            <img
              className={"blackjack-logo-small"}
              src={require("./images/BlackJack-logo.png")}
            />
            <button className={"play-btn-small"} onClick={startGame}>
              PLAY
            </button>
            <div className="score-board">
              <p className="highscores-title">
                Highscore{highscoreData.length > 1 && "s"}
              </p>

              <div className="highscores-container">
                <hr />
                {highscoreData.map((a) => (
                  <div className="highscores">
                    <p>{a[0].date}</p>
                    <p>{a[0].score}$</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="homepage">
          <img
            className={"blackjack-logo"}
            src={require("./images/BlackJack-logo.png")}
          />
          <button className={"play-btn"} onClick={startGame}>
            PLAY
          </button>
        </div>
      )}
    </div>
  );
}
