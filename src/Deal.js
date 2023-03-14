import React from "react";

export default function Deal({
  dealHand,
  bank,
  addChips,
  bet,
  allin,
  withdrawBet,
  cashout,
}) {
  return (
    <div className="deal">
      <p className="cashout" onClick={cashout}>
        $ Cashout
      </p>
      <div className="middle-section-container">
        <div className="btn-container">
          <button
            className="deal-btn side-btn"
            onClick={dealHand}
            disabled={bet <= 0 ? true : false}
          >
            Deal
          </button>
          <div className="center-btn" onClick={withdrawBet}>
            <p>{bet}$</p>
            <img className="arrow-icon" src={require("./images/arrow.png")} />
          </div>
          <button
            className="allin-btn side-btn"
            disabled={bank <= 0 ? true : false}
            onClick={allin}
          >
            All in
          </button>
        </div>
        <div className="chip-container">
          <button
            className="chip-one chip"
            onClick={() => addChips(1)}
            disabled={bank < 1 ? true : false}
          ></button>
          <button
            className="chip-two chip"
            onClick={() => addChips(5)}
            disabled={bank < 5 ? true : false}
          ></button>
          <button
            className="chip-three chip"
            onClick={() => addChips(25)}
            disabled={bank < 25 ? true : false}
          ></button>
          <button
            className="chip-four chip"
            onClick={() => addChips(100)}
            disabled={bank < 100 ? true : false}
          ></button>
          <button
            className="chip-five chip"
            onClick={() => addChips(500)}
            disabled={bank < 500 ? true : false}
          ></button>
        </div>
      </div>
      <div className="bank-info">
        <p>Bank: {bank}$</p>
      </div>
    </div>
  );
}
