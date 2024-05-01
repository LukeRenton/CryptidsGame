import React, { useEffect, useState } from 'react'
import '../Styles/Hex.css'
import scroll_img from '../Images/scroll.png'

export default function Hex( props ) {

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const renderPieces = () => {
    return props.pieces.map((piece) => {
      return <img className={'hex-piece hex-'+piece.type} src={piece.image}></img>
    })
  }

  const handleMouseEnter = () => {
    setShowTooltip(true);
  }

  const handleMouseLeave = () => {
    setShowTooltip(false);
  }

  // const handleMouseHover = (event) => {
  //   setMouseX(event.clientX);
  //   setMouseY(event.clientY);
  //   console.log('x: '+mouseX);
  // }

  return (
    <div className={'hex hex-'+props.hexNum} >
        {showTooltip ?  <div className='hex-tooltip' > {/* style={{left: `${mouseX}px`, top: `${mouseY+200}px`}} */}
                          <div className='hex-tooltip-header'>
                            Type: 
                            <div className='hex-tooltip-text'>{props.type}</div>
                          </div>
                          <div className='hex-tooltip-header'>
                            Animal territory:
                            <div className='hex-tooltip-text'>{props.animalTerritory ? props.animalTerritory : 'None'}</div>
                          </div>
                          <div className='hex-tooltip-header'>
                            Pieces:
                            {props.pieces.length > 0 ? props.pieces.map((piece) => {
                              return <div className='hex-tooltip-text'>{piece.name}</div>
                            }) : <div className='hex-tooltip-text'>None</div>}
                          </div>
                        </div> : <></>}
        <div className='hex-hitbox' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div> {/* onMouseMove={handleMouseHover} */}
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
