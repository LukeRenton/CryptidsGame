import React, { useEffect, useState } from 'react'
import '../Styles/Map.css'
import Hex from './Hex';

//This component renders the game map with hexagonal tiles and associated pieces.
export default function Map( props ) {
  // Function to get all pieces located on a specific hexagon
  const getAllPieces = (hexNum) => {
    const allPieces = [];
    // Check if blue shack piece exists and add it to allPieces if present
    if (props.pieces.blue_shack) {
      const pieceHexNum = props.pieces.blue_shack.row*6 + props.pieces.blue_shack.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'blue-shack',
          name: 'Blue Shack',
          image: require('../Images/CryptidPieces/blue_shack.png')
        });
      }
    }

    // Check if blue standing stone piece exists and add it to allPieces if present
    // Similar checks are performed for other piece types (green shack, green standing stone, etc.)
    // Replace 'blue_shack', 'blue_standing_stone', etc. with appropriate piece types
    // Replace '../Images/CryptidPieces/blue_shack.png', '../Images/CryptidPieces/blue_standing_stone.png', etc. with appropriate image paths
    // Similar comments apply to other pieces as well
    // You may consider refactoring this code to avoid repetition, perhaps by storing piece types in an array and iterating over it
    if (props.pieces.blue_standing_stone) {
      const pieceHexNum = props.pieces.blue_standing_stone.row*6 + props.pieces.blue_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'blue-standing-stone',
          name: 'Blue Standing Stone',
          image: require('../Images/CryptidPieces/blue_standing_stone.png')
        });
      }
    } 
    if (props.pieces.green_shack) {
      const pieceHexNum = props.pieces.green_shack.row*6 + props.pieces.green_shack.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'green-shack',
          name: 'Green Shack',
          image: require('../Images/CryptidPieces/green_shack.png')
        });
      }
    } 
    if (props.pieces.green_standing_stone) {
      const pieceHexNum = props.pieces.green_standing_stone.row*6 + props.pieces.green_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'green-standing-stone',
          name: 'Green Standing Stone',
          image: require('../Images/CryptidPieces/green_standing_stone.png')
        });
      }
    } 
    if (props.pieces.white_shack) {
      const pieceHexNum = props.pieces.white_shack.row*6 + props.pieces.white_shack.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'white-shack',
          name: 'White Shack',
          image: require('../Images/CryptidPieces/white_shack.png')
        });
      }
    } 
    if (props.pieces.white_standing_stone) {
      const pieceHexNum = props.pieces.white_standing_stone.row*6 + props.pieces.white_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'white-standing-stone',
          name: 'White Standing Stone',
          image: require('../Images/CryptidPieces/white_standing_stone.png')
        });
      }
    } 

    // We repeat similar checks for all the other piece types
    return allPieces;
  }

  const validatePieceGuess = (row, col, tileNumByPosition) => {
    for (let i = 0; i < props.allAvailableGuesses.length; i++) {
      const hex = props.allAvailableGuesses[i];

      if (hex.row === row && hex.col === col && hex.tileNumByPosition === tileNumByPosition) {
        return true;
      }
    }

    return false;
  }

  return (
    <div className={'map-root '+'map-root-'+props.mapSide}>
      <div className='map-number'>{props.mapNum}</div>
      { props.hexes.map((hex) => {
          return <Hex validGuess={validatePieceGuess(hex.row, hex.col, props.tileNumByPosition)} turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} tileNum={props.mapNum} tileNumByPosition={props.tileNumByPosition} pieces={getAllPieces(hex.row*6 + hex.col)} type={hex.type} animalTerritory={hex.animal_territory} hexNum={hex.row*6 + hex.col} hexRow={hex.row} hexCol={hex.col} picture={require(`../Images/CryptidTiles/Board ${hex.tile_number}/${hex.tile_image}`)}></Hex>
        })
      }
    </div>
  )
}
