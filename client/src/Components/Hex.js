/*
HEX.JS
Type: component
Description: Renders a hex piece for the board. Also parses hex information (pieces on the hex, etc.) and handles hover and click effects.
*/

import React, { useState } from 'react'
import '../Styles/Hex.css'
import PlayerCube from './PlayerCube';
import Cylinder from './Cylinder';
import { colours } from '../Models/PlayerColours';
import search from '../Images/CryptidPieces/search.svg'

export default function Hex( props ) {

  // State variables for mouse coordinates and tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  // State variables for positive and negative pieces
  const [positivePieces, setPositivePieces] = useState([]);
  const [negativePieces, setNegativePieces] = useState([]);

  // Function to render pieces on the hex
  const renderPieces = () => {
    return props.pieces.map((piece) => {
      return <img className={'hex-piece hex-'+piece.type} src={piece.image} alt="Game piece for this hex"></img>
    })
  }

  // Function to handle mouse enter event
  const handleMouseEnter = () => {
    props.setHexHover({type: props.type, animalTerritory: props.animalTerritory, pieces: props.pieces});
    setShowTooltip(true);
  }

  // Function to handle mouse leave event
  const handleMouseLeave = () => {
    props.setHexHover(null);
    setShowTooltip(false);
  }

  // Function to handle click event  
  const handleClick = () => {
    // Logic for placing positive, negative pieces or making a search
    // Modify game state accordingly
    console.log('clicked');
    if (props.placeNegative) {
      const state = props.gameState;
      const negativePieces = state.negativePieces.filter(piece => {return (piece.row === props.hexRow && piece.col === props.hexCol && piece.tileNum === props.tileNum)});
      if (negativePieces.length === 0) {
        state.negativePieces.push({tileNum: props.tileNum, row: props.hexRow, col: props.hexCol, player: props.gameState.playerTurn});
        props.setGameState(state);
        const movesList = props.movesList;
        movesList[props.gameState.playerTurn-1].push(`On turn ${props.turn}, placed negative on tile ${props.tileNum}, row ${props.hexRow}, col ${props.hexCol}`);
        props.setMovesList(movesList);

        setNegativePieces(state.negativePieces);

        // Force the map to update to ensure we can see the updated pieces
        props.forceUpdateMap();
      }
    }
    if (props.placePositive) {
      const state = props.gameState;
      const positivePieces = state.positivePieces.filter(piece => {return (piece.player === props.gameState.playerTurn && piece.row === props.hexRow && piece.col === props.hexCol && piece.tileNum === props.tileNum)});
      if (positivePieces.length === 0) {
        state.positivePieces.push({tileNum: props.tileNum, row: props.hexRow, col: props.hexCol, player: props.gameState.playerTurn});
        props.setGameState(state);
        
        const movesList = props.movesList;
        movesList[props.gameState.playerTurn-1].push(`On turn ${props.turn}, placed positive on tile ${props.tileNum}, row ${props.hexRow}, col ${props.hexCol}`);
        props.setMovesList(movesList);
        
        setPositivePieces(state.positivePieces);
        
        // Force the map to update to ensure we can see the updated pieces
        props.forceUpdateMap();
      }
    }
    if (props.placeSearch) {
      console.log('making a search');
      const state = props.gameState;
      state.searchPiece = {row: props.hexRow, col: props.hexCol, tileNum: props.tileNum}
      console.log(state);
      props.setGameState(state);
      
      const movesList = props.movesList;
      movesList[props.gameState.playerTurn-1].push(`On turn ${props.turn}, placed search on tile ${props.tileNum}, row ${props.hexRow}, col ${props.hexCol}`);
      props.setMovesList(movesList);

      // Force the map to update to ensure we can see the updated pieces
      props.forceUpdateMap();
    }
  }

  // Function to render negative pieces
  const renderNegativePieces = () => {
    return negativePieces.filter(piece => {return (piece.row === props.hexRow && piece.col === props.hexCol && piece.tileNum === props.tileNum)}).map(piece => {
      return <PlayerCube color={colours[piece.player]}></PlayerCube>
    });
  }

  // Function to render positive pieces
  const renderPositivePieces = () => {
    return positivePieces.filter(piece => {return (piece.row === props.hexRow && piece.col === props.hexCol && piece.tileNum === props.tileNum)}).map((piece, index) => {
      return <Cylinder color={colours[piece.player]} index={index}></Cylinder>
    });
  }
 
  // Function to render the search piece icon
  const renderSearchPiece = () => {
    if (props.gameState.searchPiece) {
      if (props.gameState.searchPiece.row === props.hexRow && props.gameState.searchPiece.col === props.hexCol && props.gameState.searchPiece.tileNum === props.tileNum) {
        return <img className='hex-search-piece' alt="Search piece for this hex" src={require(`../Images/CryptidPieces/search_p${props.gameState.playerTurn}.png`)}></img>
      }
    } 
  }
  // Function to determine style for revealing cryptid (make all non-cryptid tiles slightly transparent)
  const revealCryptidStyle = () => {
    // Logic for determining reveal cryptid style
    let destRow = props.destination.row;
    let destCol = props.destination.col;

    if (destRow === 'A') destRow = 10; if (destRow === 'B') destRow = 11;
    if (destCol === 'A') destCol = 10; if (destCol === 'B') destCol = 11;

    const tile_row = Math.floor(destRow/3);
    const tile_col = Math.floor(destCol/6);
    const tile_num = tile_row*2 + tile_col + 1;

    const actual_row = destRow % 3;
    const actual_col = destCol % 6;

    if (tile_num === props.tileNumByPosition && actual_row === props.hexRow && actual_col === props.hexCol) {
      return ' show-cryptid'
    } else {
      return ' gray-out'
    }
  }

  // Variable to decide whether to render ALL faces of the hex or just the visible ones
  //  -- 1 = render all faces (graphically intense)
  //  -- 0 = render only visible faces (graphically safer)
  const intenseRendering = 0;

  return (
    <div className={'hex hex-'+props.hexNum+' '+(props.revealCryptid ? revealCryptidStyle() : '')+(props.showAvailableGueses ? ' '+(props.validGuess ? 'hex-valid-guess' : 'hex-invalid-guess') : '')} style={{animationDelay: `${props.hexIndex/50}s`}} >
        <div className='hex-hitbox' onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
        <div className='hex-top-bottom bottom-face'>
            <div className='top'></div>
            <div className='middle'></div>
            <div className='bottom'></div>
        </div>
        {intenseRendering ? <>
        <div className='hex-face sideA'></div>
        <div className='hex-face sideC'></div>
        <div className='hex-face sideE'></div></> : <></>}
        <div className='hex-face sideB'></div>
        <div className='hex-face sideD'></div>
        <div className='hex-face sideF'></div>  
        <div className='hex-top-bottom top-face'>
        {intenseRendering ? <>
            <div className='top'></div>
            <div className='middle'></div>
            <div className='bottom'></div></> : <></>}
            <img src={props.picture} alt="Hex face for this hex piece"></img>
            <div className='hex-all-pieces'>
              {renderPieces()}
            </div>
        </div>
        {renderNegativePieces()}
        {renderPositivePieces()}
        {renderSearchPiece()}
    </div>
  )
}
