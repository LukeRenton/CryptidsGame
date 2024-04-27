import React, { useEffect, useState } from 'react'
import '../Styles/Map.css'
import Hex from './Hex';

export default function Map( props ) {
  return (
    <div className='map-root'>
      { props.pieces.map((piece) => {
          return <Hex pieceNum={piece.row*6 + piece.col} picture={require(`../Images/CryptidTiles/Board ${piece.tile_number}/${piece.tile_image}`)}></Hex>
        })
      }
    </div>
  )
}
