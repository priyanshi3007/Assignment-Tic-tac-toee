// src/components/Game.js
import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameSettings from './GameSettings';
import '../index.css'; // Ensure to import your CSS file

const Game = () => {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);
  const [grid, setGrid] = useState(Array(3).fill(Array(3).fill(null)));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--grid-size', gridSize);
  }, [gridSize]);

  const handleSettingsSubmit = (newGridSize, newWinStreak) => {
    setGridSize(newGridSize);
    setWinStreak(newWinStreak);
    resetGame(newGridSize);
  };

  const resetGame = (size) => {
    setGrid(Array(size).fill().map(() => Array(size).fill(null)));
    setIsXNext(true);
    setWinner(null);
  };

  const handleClick = (row, col) => {
    if (grid[row][col] || winner) return;

    const newGrid = grid.map((r, rowIndex) => (
      rowIndex === row ? r.map((cell, colIndex) => (colIndex === col ? (isXNext ? 'X' : 'O') : cell)) : r
    ));

    setGrid(newGrid);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newGrid, winStreak);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (isGridFull(newGrid)) {
      setWinner('Draw');
    }
  };

  const isGridFull = (grid) => {
    return grid.every(row => row.every(cell => cell !== null));
  };

  const calculateWinner = (grid, winStreak) => {
    const lines = [];
    const size = grid.length;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winStreak; j++) {
        lines.push(grid[i].slice(j, j + winStreak)); 
        lines.push(grid.slice(j, j + winStreak).map(row => row[i])); 
      }
    }

    for (let i = 0; i <= size - winStreak; i++) {
      for (let j = 0; j <= size - winStreak; j++) {
        const diag1 = [], diag2 = [];
        for (let k = 0; k < winStreak; k++) {
          diag1.push(grid[i + k][j + k]);
          diag2.push(grid[i + k][j + winStreak - k - 1]);
        }
        lines.push(diag1, diag2);
      }
    }

    for (const line of lines) {
      if (line.every(cell => cell && cell === line[0])) {
        return line[0];
      }
    }
    return null;
  };

  return (
    <div className="game">
      <GameSettings onSubmit={handleSettingsSubmit} />
      <Board grid={grid} onClick={handleClick} />
      {winner && (
        <div id="game-over">
          <h2>Game Over</h2>
          {winner === 'Draw' ? <p>It's a Draw!</p> : <p>Winner: {winner}</p>}
          <button onClick={() => resetGame(gridSize)}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;
