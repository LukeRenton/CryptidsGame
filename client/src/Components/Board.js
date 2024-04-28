import React from 'react'
import '../Styles/Board.css'
import Map from './Map'


export default function Board( props ) {
  
  const getTilePieces = (tile_num) => {
    const tilePieces = {};
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
        <div className='board-column-1'>
            <Map hexes={props.tiles[1]} pieces={getTilePieces(1)}></Map>
            <Map hexes={props.tiles[2]} pieces={getTilePieces(2)}></Map>
            <Map hexes={props.tiles[3]} pieces={getTilePieces(3)}></Map>
        </div>
        <div className='board-column-2'>
            <Map hexes={props.tiles[4]} pieces={getTilePieces(4)}></Map>
            <Map hexes={props.tiles[5]} pieces={getTilePieces(5)}></Map>
            <Map hexes={props.tiles[6]} pieces={getTilePieces(6)}></Map>
        </div>
    </div>
  )
}
