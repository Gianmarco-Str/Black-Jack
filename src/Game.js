import React from "react";

export default function Game({
  dealerHand,
  playerHand,
  setPlayerHand,
  giveCard,
  dealerSum,
  playerSum,
  bank,
  bet,
  double,
  stand,
  btnDisabled,
  children,
  endGame,
  resultMessage,
}) {
  return (
    <div className="game">
      <div className="game-middle-container">
        <div className="dealer-container">
          <div className="dealer-sum-container">
            <div className="dealer-tag">Dealer</div>
            <div className="dealer-sum">{dealerSum}</div>
          </div>
          <div className="dealer-card-container">
            {dealerHand.map((card) => (
              <img
                className="card dealer-card"
                src={require(`./images/cards/${card}.png`)}
              />
            ))}
            {dealerHand.length < 2 && (
              <img
                className="card dealer-card"
                src={require(`./images/coveredCard.png`)}
              />
            )}
          </div>
        </div>

        <div className="game-btn-container">
          <button
            disabled={btnDisabled ? true : false}
            className="hit-btn side-btn"
            onClick={() => giveCard(setPlayerHand)}
          >
            Hit
          </button>
          <div className="double-container">
            <button
              disabled={btnDisabled || bet > bank ? true : false}
              className="double-btn"
              onClick={double}
            >
              x2
            </button>
            <div className="bet">{bet}$</div>
          </div>
          <button
            disabled={btnDisabled ? true : false}
            className="stand-btn side-btn"
            onClick={stand}
          >
            Stand
          </button>
        </div>

        <div className="player-container">
          <div className="player-card-container">
            {playerHand.map((card) => (
              <img
                className="card player-card"
                src={require(`./images/cards/${card}.png`)}
              />
            ))}
          </div>
          <div className="player-sum-container">
            <div className="player-sum">{playerSum}</div>
            <div className="player-tag">Player</div>
          </div>
        </div>
      </div>
      {children}
      <div className="bank-info">
        <p>Bank: {bank}$</p>
      </div>
      {endGame && <p className="game-result">{resultMessage}</p>}
    </div>
  );
}
