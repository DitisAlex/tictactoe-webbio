import React, { useState, useEffect } from "react";
import "./styles.css";
import { Board } from "./components/Board.jsx";
import axios from "axios";

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
  const API_URL = process.env.REACT_APP_API_URL;

  const [boardValues, setBoardValues] = useState(DEFAULT_BOARD);
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) submitResults(winner, boardValues);
  }, [winner]);

  const onBoxClick = (targetIndex) => {
    if (boardValues[targetIndex] === "") {
      const newBoardValues = boardValues.map((value, index) => {
        if (index === targetIndex) return currentTurn === "X" ? "X" : "O";
        else return value;
      });

      setBoardValues(newBoardValues);
      updateCurrentTurn();

      newBoardValues.map((key) => {
        if (key === "") determineWinner(newBoardValues);
        else if (newBoardValues.every((value) => value !== "")) {
          setWinner("draw");
        }
      });
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

  const submitResults = (winner, board) => {
    axios
      .post(
        API_URL,
        {
          winner: winner,
          board: board,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="wrapper">
      {winner ? (
        winner !== "draw" ? (
          <h1>{winner} won!</h1>
        ) : (
          <h1>Draw!</h1>
        )
      ) : (
        <h1>Current turn: {currentTurn}</h1>
      )}
      <Board board={boardValues} onClick={winner ? resetBoard : onBoxClick} />
    </div>
  );
}
