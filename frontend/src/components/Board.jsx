import React from "react";

import { Box } from "./Box.jsx";

export const Board = ({ board, onClick }) => {
  return (
    <div className="board">
      {board.map((value, index) => {
        return (
          <Box value={value} key={index} onClick={(e) => onClick(index)} />
        );
      })}
    </div>
  );
};
