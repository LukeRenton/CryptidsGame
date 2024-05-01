import React, { useEffect, useState } from 'react'
import '../Styles/Map.css'
import Hex from './Hex';

export default function Map( props ) {
  const getAllPieces = (hexNum) => {
    const allPieces = [];
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
    return allPieces;
  }
  return (
    <div className={'map-root '+'map-root-'+props.mapSide}>
      <div className='map-number'>{props.mapNum}</div>
      { props.hexes.map((hex) => {
          return <Hex pieces={getAllPieces(hex.row*6 + hex.col)} type={hex.type} animalTerritory={hex.animal_territory} hexNum={hex.row*6 + hex.col} picture={require(`../Images/CryptidTiles/Board ${hex.tile_number}/${hex.tile_image}`)}></Hex>
        })
      }
    </div>
  )
}
