import React, { useState } from "react";
import "./styles.css";

import { Board } from "./components/Board.jsx";

export default function App() {
  const POSSIBILITIES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const DEFAULT_BOARD = Array(9).fill("");

  const [boardValues, setBoardValues] = useState(DEFAULT_BOARD);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  const onBoxClick = (targetIndex) => {
    if (boardValues[targetIndex] === "") {
      const newBoardValues = boardValues.map((value, index) => {
        if (index === targetIndex) return currentTurn === "X" ? "X" : "O";
        else return value;
      });

      setBoardValues(newBoardValues);
      updateCurrentTurn();
      determineWinner(newBoardValues);
    }
  };

  const updateCurrentTurn = () => {
    if (currentTurn === "X") setCurrentTurn("O");
    else setCurrentTurn("X");
  };

  const determineWinner = (board) => {
    POSSIBILITIES.map((key, index) => {
      const [x, y, z] = POSSIBILITIES[index];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setWinner(board[x]);
      }
    });
  };

  const resetBoard = () => {
    setBoardValues(DEFAULT_BOARD);
    setWinner(null);
  };

  return (
    <div className="wrapper">
      {winner ? (
        <h1>Winner: {winner}</h1>
      ) : (
        <h1>Current Turn: {currentTurn}</h1>
      )}
      <Board board={boardValues} onClick={winner ? resetBoard : onBoxClick} />
    </div>
  );
}
