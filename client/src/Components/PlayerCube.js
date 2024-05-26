/*
PLAYERCUBE.JS
Type: component
Description: Renders a cube to be used on the hexes of the game.
*/

import React from 'react';
import '../Styles/PlayerCube.css';
// Define and export the PlayerCube functional component
export default function PlayerCube({ color = 'skyblue' }) {
  return (
      <div className="cube">
        <div className="face top" style={{ backgroundColor: color }}></div>
        <div className="face bottom" style={{ backgroundColor: color }}></div>
        <div className="face left" style={{ backgroundColor: color }}></div>
        <div className="face right" style={{ backgroundColor: color }}></div>
        <div className="face front" style={{ backgroundColor: color }}></div>
        <div className="face back" style={{ backgroundColor: color }}></div>
      </div>
  );
}
