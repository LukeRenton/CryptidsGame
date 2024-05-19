import React, { useEffect, useState } from 'react'
import '../Styles/BoardInfo.css'
import scroll from '../Images/game-script-back.png'
import avatar from '../Icons/avatar.svg'
import block from '../Icons/block.svg'
import info from '../Icons/info.svg'
import hex from '../Icons/hex.svg'
import question from '../Icons/question.svg'
import arrow from '../Icons/arrow.gif'
import { colours } from '../Models/PlayerColours'

export default function BoardInfo( props ) {
    
    const [viewClue, setViewClue] = useState(false);
    const [viewHint, setViewHint] = useState(false);
    const [confirmViewHint, setConfirmViewHint] = useState(false);
    const [confirmViewCryptid, setConfirmViewCryptid] = useState(false);
    const [blurBack, setBlurBack] = useState(false);

    const [hideAccordion, setHideAccordion] = useState(false);

    // const [forceUpdate, setForceUpdate] = useState(false);

    const [playerNum, setPlayerNum] = useState(1);
    // const playerNum = 2;

    const handleViewClue = () => {
        if (viewClue) {
            setHideAccordion(true);
            setTimeout(() => {
                setViewClue(false);
            },900);
        } else {
            setHideAccordion(false);
            setViewClue(true);
        }
    }

    const handleViewHint = () => {
        if (!confirmViewHint) {
            setBlurBack(true);
            setConfirmViewHint(true);
        }
    }

    const handleCancelConfirmHint = () => {
        setBlurBack(false);
        setConfirmViewHint(false);
    }

    const handleConfirmHint = () => {
        setViewHint(true);
        setBlurBack(false);
        setConfirmViewHint(false);
    }

    const handleEndTurn = () => {
        props.setPlacePositive(false);
        props.setPlaceNegative(false);
        props.setPlaceSearch(false);

        const state = props.gameState;
        if (state.playerTurn + 1 == (props.numPlayers+1)) {
            state.playerTurn = 1;
            props.setTurn(props.turn + 1);
        } else {
            state.playerTurn += 1;
        }
        props.setGameState(state);
        setPlayerNum(props.gameState.playerTurn);
    }

    const handleViewCryptid = () => {
        if (!confirmViewCryptid) {
            setBlurBack(true);
            setConfirmViewCryptid(true);
        }
    }

    const handleConfirmCryptid = () => {
        props.setRevealCryptid(true);
        setBlurBack(false);
        setConfirmViewCryptid(false);
    }

    const handleCancelCryptid = () => {
        setBlurBack(false);
        setConfirmViewCryptid(false);
    }

  return (
    <div className='board-info-root'>
        {blurBack ? <div className='board-info-blur-back'></div> : <></>}
        {confirmViewHint ?
        <div className='board-info-confirm'>
            <div className='header'>
                <h2>View Hint</h2>
            </div>
            <div className='subheader'>
                Please ensure that all players have confirmed to show the hint!
            </div>
            <div className='board-info-confirm-buttons'>
                <button className='board-info-confirm-button accept' onClick={handleConfirmHint}>Show hint</button>
                <button className='board-info-confirm-button cancel' onClick={handleCancelConfirmHint}>Cancel</button>
            </div>
        </div> : <></>}
        {confirmViewCryptid ?
        <div className='board-info-confirm'>
            <div className='header'>
                <h2>View Cryptid</h2>
            </div>
            <div className='subheader'>
                Please ensure that all players have confirmed to reveal the Cryptid's true location!
            </div>
            <div className='board-info-confirm-buttons'>
                <button className='board-info-confirm-button accept' onClick={handleConfirmCryptid}>Reveal Cryptid</button>
                <button className='board-info-confirm-button cancel' onClick={handleCancelCryptid}>Cancel</button>
            </div>
        </div> : <></>}
        <div className='board-header'><h1>Cryptid</h1></div>
        <ul className='board-info-items'>
            <li className='board-info-item' style={{background: `${colours[props.gameState.playerTurn]}`}}>
                <div className='board-info-turn'>
                    <div className='header'>
                        <img className='header-icon' src={avatar}/><h2>TURN</h2>
                    </div>
                    <div className='text'>
                        {/* Player {playerNum} */}
                        {props.playerNames[playerNum-1]}
                    </div>
                </div>
            </li>

            <li className='board-info-item'>
                <div className='board-info-decisions'>
                    <div className='header'>
                        <img className='header-icon' src={block}/><h2>DECISIONS</h2>
                    </div>
                    <ul className='board-info-decisions-list'>
                        <li className='board-info-decisions-item' onClick={() => props.setPlacePositive(!props.placePositive)}>
                            <div className='item-text' style={{color: `${props.placePositive ? colours[props.gameState.playerTurn] : ''}`}}>
                                Place a positive
                            </div>
                            {props.placePositive
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                        <li className='board-info-decisions-item' onClick={() => props.setPlaceNegative(!props.placeNegative)}>
                            <div className='item-text' style={{color: `${props.placeNegative ? colours[props.gameState.playerTurn] : ''}`}}>
                                Place a negative
                            </div>
                            {props.placeNegative
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                        <li className='board-info-decisions-item' onClick={() => props.setPlaceSearch(!props.placeSearch)}>
                            <div className='item-text' style={{color: `${props.placeSearch ? colours[props.gameState.playerTurn] : ''}`}}>
                                Make a search
                            </div>
                            {props.placeSearch
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                    </ul>
                </div>
            </li>

            <li className='board-info-item'>
                <div className='board-info-information'>
                    <div className='header'>
                        <img className='header-icon' src={info}/><h2>INFORMATION</h2>
                    </div>
                    <ul className='board-info-information-list'>
                        <li className='board-info-information-item'>
                            <div className='board-info-information-item-text' onClick={handleViewClue}>
                                {!viewClue ? 'View my clue' : 'Hide my clue'}
                            </div>
                            {viewClue
                            ?
                            <div className={'board-info-information-item-accordion '+(hideAccordion ? ' hide-accordion' : '')} onClick={handleViewClue}> 
                                {props.clues[props.gameState.playerTurn-1]}
                            </div> : <></>}
                        </li>

                        {!viewHint
                            ?
                            <li className='board-info-information-item' onClick={handleViewHint}>
                                View the hint
                            </li> : <></>
                        }
                        <li className='board-info-information-item' onClick={handleViewCryptid}>
                            Reveal the Cryptid
                        </li>
                    </ul>
                </div>
            </li>

            {viewHint ? 
            <li className='board-info-item'>
                <div className='header'>
                    <img className='header-icon' src={question}/><h2>HINT</h2>
                </div>
                <div className='board-info-hint'>
                    {props.hint}
                </div>
            </li> : <></>}

            <li className='board-info-item'>
                <div className='header'>
                    <img className='header-icon' src={hex}/><h2>HEX DATA</h2>
                </div>
                <div className='board-info-hex-info'>
                    {
                        props.hexHover === null 
                        ? 
                        'Hover over a hex to see information about that hex' 
                        : 
                        <div>
                            <div className='board-info-hex-info-header'>
                                Type: 
                                <div className='board-info-hex-info-text'>{props.hexHover.type}</div>
                            </div>
                            <div className='board-info-hex-info-header'>
                                Animal territory:
                                <div className='board-info-hex-info-text'>{props.hexHover.animalTerritory ? props.hexHover.animalTerritory : 'None'}</div>
                            </div>
                            <div className='board-info-hex-info-header'>
                                Pieces:
                                {props.hexHover.pieces.length > 0 ? props.hexHover.pieces.map((piece) => {
                                    return <div className='board-info-hex-info-text'>{piece.name}</div>
                                }) : <div className='board-info-hex-info-text'>None</div>}
                            </div>
                        </div> 
                    }
                </div>
            </li>

            <li className='board-info-item'>
                <div className='board-info-end-turn'>
                    <button className='board-info-end-turn-button' onClick={handleEndTurn}>End Turn</button>
                </div>
            </li>
            
        </ul>
    </div>
  )
}
