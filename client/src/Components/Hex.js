import React, { useEffect, useState } from 'react'
import '../Styles/Hex.css'

export default function Hex( props ) {
  const renderPieces = () => {
    console.log(props.hexNum + ' --> ' + props.pieces);
    return props.pieces.map((piece) => {
      return <img className={'hex-piece hex-'+piece.type} src={piece.image}></img>
    })
  }
  return (
    <div className={'hex hex-'+props.hexNum} >
        <div className='hex-top-bottom bottom-face'>
            <div className='top'></div>
            <div className='middle'></div>
            <div className='bottom'></div>
        </div>
        <div className='hex-face sideA'></div>
        <div className='hex-face sideB'></div>
        <div className='hex-face sideC'></div>
        <div className='hex-face sideD'></div>
        <div className='hex-face sideE'></div>
        <div className='hex-face sideF'></div>
        <div className='hex-top-bottom top-face'>
            <div className='top'></div>
            <div className='middle'></div>
            <div className='bottom'></div>
            <img src={props.picture}></img>
            <div className='hex-all-pieces'>
              {renderPieces()}
            </div>
        </div>

    </div>
  )
}
