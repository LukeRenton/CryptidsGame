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
          image: require('../Images/CryptidPieces/blue_shack.png')
        });
      }
    }
    if (props.pieces.blue_standing_stone) {
      const pieceHexNum = props.pieces.blue_standing_stone.row*6 + props.pieces.blue_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'blue-standing-stone',
          image: require('../Images/CryptidPieces/blue_standing_stone.png')
        });
      }
    } 
    if (props.pieces.green_shack) {
      const pieceHexNum = props.pieces.green_shack.row*6 + props.pieces.green_shack.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'green-shack',
          image: require('../Images/CryptidPieces/green_shack.png')
        });
      }
    } 
    if (props.pieces.green_standing_stone) {
      const pieceHexNum = props.pieces.green_standing_stone.row*6 + props.pieces.green_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'green-standing-stone',
          image: require('../Images/CryptidPieces/green_standing_stone.png')
        });
      }
    } 
    if (props.pieces.white_shack) {
      const pieceHexNum = props.pieces.white_shack.row*6 + props.pieces.white_shack.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'white-shack',
          image: require('../Images/CryptidPieces/white_shack.png')
        });
      }
    } 
    if (props.pieces.white_standing_stone) {
      const pieceHexNum = props.pieces.white_standing_stone.row*6 + props.pieces.white_standing_stone.col;
      if (pieceHexNum === hexNum) {
        allPieces.push({
          type: 'white-standing-stone',
          image: require('../Images/CryptidPieces/white_standing_stone.png')
        });
      }
    } 
    return allPieces;
  }
  return (
    <div className='map-root'>
      { props.hexes.map((hex) => {
          return <Hex pieces={getAllPieces(hex.row*6 + hex.col)} hexNum={hex.row*6 + hex.col} picture={require(`../Images/CryptidTiles/Board ${hex.tile_number}/${hex.tile_image}`)}></Hex>
        })
      }
    </div>
  )
}
