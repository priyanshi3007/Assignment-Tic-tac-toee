// src/components/Board.js
import React from 'react';

const Board = ({ grid, onClick }) => (
  <div id="game-board">
    {grid.map((row, rowIndex) => (
      <ol key={rowIndex}>
        {row.map((cell, colIndex) => (
          <button key={colIndex} onClick={() => onClick(rowIndex, colIndex)}>
            {cell}
          </button>
        ))}
      </ol>
    ))}
  </div>
);

export default Board;
