import React from 'react'
import '../Styles/Board.css'
import Map from './Map'


export default function Board( props ) {
  console.log(props.tiles)
  return (
    <div className='board-root'>
        <div className='board-column-1'>
            <Map pieces={props.tiles[1]}></Map>
            {/* <Map pieces={props.tiles[2]}></Map> */}
            {/* <Map pieces={props.tiles[3]}></Map> */}
        </div>
        <div className='board-column-2'>
            {/* <Map pieces={props.tiles[4]}></Map> */}
            {/* <Map pieces={props.tiles[5]}></Map> */}
            {/* <Map pieces={props.tiles[6]}></Map> */}
        </div>
    </div>
  )
}
