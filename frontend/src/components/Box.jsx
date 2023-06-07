import React from "react";

export const Box = ({ value, onClick }) => {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
};
