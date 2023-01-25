import { useState } from "react";
import "./App.css";
import Board from "./Components/Board/Board";
import ScoreBoard from "./Components/ScoreBoard/ScoreBoard";

const winnerPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turn, setTurn] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winnerSquares, setWinnerSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });

  const reset = () => {
    setTurn("X");
    setSquares(Array(9).fill(null));
    setWinnerSquares([]);
  };

  const checkWinner = (newSquares) => {
    for (let i = 0; i < winnerPositions.length; i++) {
      const [a, b, c] = winnerPositions[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        endGame(newSquares[a], winnerPositions[i]);
        return;
      }
    }

    if (!newSquares.includes(null)) {
      endGame(null, Array.from(Array(10).keys()));
      return;
    }
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleClick = (square) => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turn);
    setSquares(newSquares);

    checkWinner(newSquares);
  };

  const endGame = (result, winnerPositions) => {
    setTurn(null);
    if (result != null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }
    setWinnerSquares(winnerPositions);
    setTimeout(reset, 800);
  };

  return (
    <div className="container">
      <h1 className="title"> 3 en linea</h1>
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
      <Board
        winnerSquares={winnerSquares}
        turn={turn}
        squares={squares}
        onClick={handleClick}
      />
    </div>
  );
};

export default App;

// https://www.youtube.com/watch?v=Yq7yWlmzsvM 1.05

//falta arreglar el resultado con animacion y agregar los cuadros
