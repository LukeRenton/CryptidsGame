import React, { useState } from 'react'
import '../Styles/Board.css'
import Map from './Map'
import Clues from './Clues'

// Board component for the Cryptid game, responsible for rendering the game board and managing game pieces.
export default function Board( props ) {  
  // Function to get the pieces located on a specific tile.
  const getTilePieces = (tile_num) => {
    const tilePieces = {};
    // Check and assign each piece to the corresponding tile if it matches the tile number.
    if (props.pieces.blue_shack.tile_num == tile_num) {
      tilePieces.blue_shack = props.pieces.blue_shack;
    } else {tilePieces.blue_shack = null}
    if (props.pieces.blue_standing_stone.tile_num == tile_num) {
      tilePieces.blue_standing_stone = props.pieces.blue_standing_stone;
    } else {tilePieces.blue_standing_stone = null}
    if (props.pieces.green_shack.tile_num == tile_num) {
      tilePieces.green_shack = props.pieces.green_shack;
    } else {tilePieces.green_shack = null}
    if (props.pieces.green_standing_stone.tile_num == tile_num) {
      tilePieces.green_standing_stone = props.pieces.green_standing_stone;
    } else {tilePieces.green_standing_stone = null}
    if (props.pieces.white_shack.tile_num == tile_num) {
      tilePieces.white_shack = props.pieces.white_shack;
    } else {tilePieces.white_shack = null}
    if (props.pieces.white_standing_stone.tile_num == tile_num) {
      tilePieces.white_standing_stone = props.pieces.white_standing_stone;
    } else {tilePieces.white_standing_stone = null}
    return tilePieces;
  }

  return (
    <div className='board-root'>
        <div className='board-columns'>
          <div className='board-column-1'>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={1} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[1][0].tile_number} hexes={props.tiles[1]} pieces={getTilePieces(1)} mapSide={'left'}></Map>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={3} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[3][0].tile_number} hexes={props.tiles[3]} pieces={getTilePieces(3)} mapSide={'left'}></Map>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={5} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[5][0].tile_number} hexes={props.tiles[5]} pieces={getTilePieces(5)} mapSide={'left'}></Map>
          </div>
          <div className='board-column-2'>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={2} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[2][0].tile_number} hexes={props.tiles[2]} pieces={getTilePieces(2)} mapSide={'right'}></Map>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={4} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[4][0].tile_number} hexes={props.tiles[4]} pieces={getTilePieces(4)} mapSide={'right'}></Map>
              <Map turn={props.turn} movesList={props.movesList} setMovesList={props.setMovesList} tileNumByPosition={6} destination={props.destination} revealCryptid={props.revealCryptid} placeSearch={props.placeSearch} setPlaceSearch={props.setPlaceSearch} placePositive={props.placePositive} setPlacePositive={props.setPlacePositive} placeNegative={props.placeNegative} setPlaceNegative={props.setPlaceNegative} gameState={props.gameState} setGameState={props.setGameState} setHexHover={props.setHexHover} mapNum={props.tiles[6][0].tile_number} hexes={props.tiles[6]} pieces={getTilePieces(6)} mapSide={'right'}></Map>
          </div>
        </div>
        {/* <div className='board-clues'>
          <Clues clues={props.clues} hint={props.hint} row={props.row} col={props.col}></Clues>
        </div> */}
    </div>
  )
}
