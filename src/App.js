import React, { useEffect, useState } from "react";
import "./styles.css";
import Homepage from "./Homepage";
import Deal from "./Deal";
import Game from "./Game";
import Message from "./Message";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const [dealerSum, setDealerSum] = useState(0);
  const [playerSum, setPlayerSum] = useState(0);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [handDealt, setHandDealt] = useState(false);
  const [playerHandDealt, setPlayerHandDealt] = useState(false);
  const [playerTurnEnd, setPlayerTurnEnd] = useState(false);

  const [deck, setDeck] = useState([]);
  const [bank, setBank] = useState(1000);
  const [bet, setBet] = useState(0);
  const [doubled, setDoubled] = useState(false);

  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [message, setMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [highscoreData, setHighscoreData] = useState([]);

  function buildDeck() {
    let values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    let types = ["C", "D", "S", "H"];
    const newArr = [];

    for (let t = 0; t < types.length; t++) {
      for (let v = 0; v < values.length; v++) {
        newArr.push(values[v] + "-" + types[t]);
      }
    }

    for (let i = 0; i < newArr.length; i++) {
      let a = Math.floor(Math.random() * newArr.length);
      let b = newArr[i];
      newArr[i] = newArr[a];
      newArr[a] = b;
    }
    setDeck(newArr);
  }

  useEffect(() => {
    if (!endGame) {
      buildDeck();
    }
  }, [endGame]);

  function giveCard(hand) {
    hand((prevHand) => [...prevHand, deck[0]]);
    setDeck((prevDeck) => prevDeck.slice(1));
  }

  function startGame() {
    setGameStarted(true);
  }

  function dealHand() {
    if (bet > 0) {
      setHandDealt((prevState) => !prevState);
    }
  }

  function giveInitialHand(hand) {
    hand((prevHand) => [...prevHand, deck[0], deck[1]]);
    setDeck((prevDeck) => prevDeck.slice(2));
    setPlayerHandDealt(true);
  }

  function getSum(hand, setHandSum) {
    let score = 0;
    let figures = ["K", "Q", "J"];
    if (hand.length > 0) {
      for (let i = 0; i < hand.length; i++) {
        let data = hand[i].split("-");
        let value = data[0];
        if (value === "A" && score >= 10) {
          score += 1;
          continue;
        }
        if (value === "A") {
          score += 11;
          continue;
        }
        if (figures.includes(value)) {
          score += 10;
          continue;
        }
        score += parseInt(value);
      }
    }
    setHandSum(score);
    return score;
  }

  useEffect(() => {
    if (handDealt) {
      giveInitialHand(setPlayerHand);
    }
    if (!handDealt) {
      setBet(bank > 99 ? 100 : bank);
      setBank((prevBank) => (prevBank > 99 ? prevBank - 100 : 0));
      if (bank <= 0 && bet <= 0) {
        setGameStarted(false);
        setBank(900);
        setBet(100);
      }
    }
  }, [handDealt]);

  useEffect(() => {
    if (playerHandDealt) {
      giveCard(setDealerHand);
    }
  }, [playerHandDealt]);

  useEffect(() => {
    const score = getSum(playerHand, setPlayerSum);
    if (doubled && score > 21) {
      setEndGame(true);
    }
  }, [playerHand, doubled]);

  useEffect(() => {
    getSum(dealerHand, setDealerSum);
  }, [dealerHand]);

  useEffect(() => {
    if (playerSum > 21) {
      setEndGame(true);
      setBtnDisabled(true);
    }
  }, [playerSum]);

  useEffect(() => {
    if (playerTurnEnd && !endGame) {
      if (dealerSum < 17) {
        setTimeout(() => giveCard(setDealerHand), 1000);
      } else {
        setEndGame(true);
      }
    }
  }, [dealerSum, playerTurnEnd]);

  useEffect(() => {
    if (endGame) {
      const double = bet * 2;
      if (dealerSum > 21) {
        setBank((prevBank) => prevBank + double);
        setResultMessage("+" + double);
        setBet(0);
        setMessage("You Won!");
      } else if (playerSum < 22 && playerSum > dealerSum) {
        setBank((prevBank) => prevBank + double);
        setResultMessage("+" + double);
        setBet(0);
        setMessage("You Won!");
      } else if (playerSum === dealerSum) {
        setBank((prevBank) => prevBank + bet);
        setResultMessage("+" + bet);
        setBet(0);
        setMessage("Tie");
      } else {
        setResultMessage("-" + bet);
        setBet(0);
        setMessage("You Lost");
      }
    }
  }, [endGame]);

  function addChips(num) {
    if (bank >= num) {
      setBank((prevNum) => prevNum - num);
      setBet((prevBet) => prevBet + num);
    }
  }

  function allin() {
    setBet((prevBet) => prevBet + bank);
    setBank(0);
  }

  function withdrawBet() {
    setBank((prevBank) => prevBank + bet);
    setBet(0);
  }

  function double() {
    if (bet <= bank) {
      giveCard(setPlayerHand);
      setBtnDisabled(true);
      setBank((prevBank) => prevBank - bet);
      setBet((prevBet) => prevBet * 2);
      setDoubled(true);
    }
  }

  useEffect(() => {
    if (doubled) {
      if (playerSum < 21) {
        setPlayerTurnEnd(true);
      }
    }
  }, [doubled]);

  function stand() {
    setBtnDisabled(true);
    if (playerSum < dealerSum) {
      setEndGame(true);
    } else if (playerSum >= dealerSum) {
      setPlayerTurnEnd(true);
    }
  }

  function restartGame() {
    setHandDealt(false);
    setEndGame(false);
    setPlayerTurnEnd(false);
    setPlayerHandDealt(false);
    setDoubled(false);
    setBtnDisabled(false);
    setPlayerHand([]);
    setDealerHand([]);
  }

  function cashout() {
    const d = new Date();
    const m = d.getMonth() + 1;
    const time =
      ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + m).slice(-2);
    const year = d.getFullYear();
    const date = year + "/" + month + "/" + day + " - " + time;
    let arr = [];
    arr.push({ date: date, score: bank + bet });
    let newArr = [];
    newArr.push(arr);
    const highscoreDataStorage = JSON.parse(
      localStorage.getItem("HIGHSCORE-DATA-STORAGE")
    );
    arr = [];
    if (highscoreDataStorage) {
      highscoreDataStorage.map((data) => newArr.push(data));
    }
    if (newArr.length > 1) {
      const a = newArr.map((x) => x[0]);
      const sorted = a.sort((a, b) => b.score - a.score);
      const mapped = sorted.map((a) => [a]);
      newArr = mapped;
      if (newArr.length > 5) {
        newArr.pop();
      }
    }
    localStorage.setItem("HIGHSCORE-DATA-STORAGE", JSON.stringify(newArr));
    setBank(900);
    setBet(100);
    setGameStarted(false);
  }

  useEffect(() => {
    setHighscoreData(
      JSON.parse(localStorage.getItem("HIGHSCORE-DATA-STORAGE"))
    );
  }, [gameStarted]);

  return (
    <div className="side-background">
      <div className="background">
        <div className="noise">
          {!gameStarted ? (
            <Homepage startGame={startGame} highscoreData={highscoreData} />
          ) : gameStarted && !handDealt ? (
            <Deal
              dealHand={dealHand}
              bank={bank}
              addChips={addChips}
              bet={bet}
              allin={allin}
              withdrawBet={withdrawBet}
              cashout={cashout}
            />
          ) : (
            <Game
              playerHand={playerHand}
              setPlayerHand={setPlayerHand}
              dealerHand={dealerHand}
              giveCard={giveCard}
              playerSum={playerSum}
              dealerSum={dealerSum}
              playerTurnEnd={playerTurnEnd}
              bank={bank}
              bet={bet}
              double={double}
              stand={stand}
              btnDisabled={btnDisabled}
              endGame={endGame}
              setHandDealt={setHandDealt}
              resultMessage={resultMessage}
            >
              {endGame && (
                <Message restartGame={restartGame} message={message} />
              )}
            </Game>
          )}
        </div>
      </div>
    </div>
  );
}
