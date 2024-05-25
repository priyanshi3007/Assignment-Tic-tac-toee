// src/components/GameSettings.js
import React, { useState } from 'react';

const GameSettings = ({ onSubmit }) => {
  const [gridSize, setGridSize] = useState(3);
  const [winStreak, setWinStreak] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(gridSize, winStreak);
  };

  return (
    <form id="pre-game" onSubmit={handleSubmit}>
      <label>
        Grid Size (3-10):
        <input
          type="number"
          min="3"
          max="10"
          value={gridSize}
          onChange={(e) => setGridSize(Number(e.target.value))}
        />
      </label>
      <label>
        Win Streak (3-{gridSize}):
        <input
          type="number"
          min="3"
          max={gridSize}
          value={winStreak}
          onChange={(e) => setWinStreak(Number(e.target.value))}
        />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
};

export default GameSettings;
