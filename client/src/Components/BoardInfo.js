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

// BoardInfo component displays various game information such as player turns, clues, hints, and hex data.
export default function BoardInfo( props ) {
    
    // State variables for managing the visibility and confirmation dialogs
    const [viewClue, setViewClue] = useState(false);
    const [viewHint, setViewHint] = useState(false);
    const [confirmViewHint, setConfirmViewHint] = useState(false);
    const [confirmViewCryptid, setConfirmViewCryptid] = useState(false);
    const [blurBack, setBlurBack] = useState(false);
    const [showPlayerDropdown, setShowPlayerDropdown] = useState(false);


    const [hideAccordion, setHideAccordion] = useState(false);

    // const [forceUpdate, setForceUpdate] = useState(false);

    const [playerNum, setPlayerNum] = useState(1);
    // const playerNum = 2;

    // Function to handle the viewing of clues with animation for accordion effect
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

    // Function to handle the logic of changing a player 
    const handlePlayerChange = (newPlayerNum) => {
        const state = { ...props.gameState, playerTurn: newPlayerNum };
        props.setGameState(state);
        setPlayerNum(newPlayerNum);
        setShowPlayerDropdown(false);
    }
    

    // Function to initiate the process of viewing the hint, requiring confirmation
    const handleViewHint = () => {
        if (!confirmViewHint) {
            setBlurBack(true);
            setConfirmViewHint(true);
        }
    }

    // Function to cancel the hint confirmation process
    const handleCancelConfirmHint = () => {
        setBlurBack(false);
        setConfirmViewHint(false);
    }

    // Function to confirm and display the hint
    const handleConfirmHint = () => {
        setViewHint(true);
        setBlurBack(false);
        setConfirmViewHint(false);
    }

    // Function to handle the end of the current player's turn and advance to the next player
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
            props.setTurn(props.turn + 1);
        }
        props.setGameState(state);
        setPlayerNum(props.gameState.playerTurn);
    }

    // Function to initiate the process to reveal the Cryptid, requiring confirmation
    const handleViewCryptid = () => {
        if (!confirmViewCryptid) {
            setBlurBack(true);
            setConfirmViewCryptid(true);
        }
    }

    // Function to confirm and reveal the Cryptid's location
    const handleConfirmCryptid = () => {
        props.setRevealCryptid(true);
        setBlurBack(false);
        setConfirmViewCryptid(false);
    }

    // Function to cancel the Cryptid reveal confirmation process
    const handleCancelCryptid = () => {
        setBlurBack(false);
        setConfirmViewCryptid(false);
    }

    const handleShowPlayerDropdown = () => {

        const players = [];
        for (let i = 1; i <= props.numPlayers; i++) {
            players.push(i);
        }

        return <div className='player-dropdown'>
                {players.filter(num => num !== playerNum).map((num) => (
                    <div key={num} className='player-dropdown-item' style={{background: `${colours[num]}`}} onClick={() => handlePlayerChange(num)}>
                        {props.playerNames[num-1] ? props.playerNames[num-1] : `Player ${num}`}
                    </div>
                ))}
            </div>
    }
    
    const handleToggleShowAvailableGuesses = () => {
        console.log(props.showAvailableGueses);
        props.setShowAvailableGuesses(!props.showAvailableGueses);
    }

  // Render the main structure of the BoardInfo component  
  return (
    <section className='board-info-root'>
        {blurBack ? <div className='board-info-blur-back'></div> : <></>}
        {confirmViewHint ?
        <section className='board-info-confirm'>
            <section className='header'>
                <h2>View Hint</h2>
            </section>
            <section className='subheader'>
                Please ensure that all players have confirmed to show the hint!
            </section>
            <form className='board-info-confirm-buttons'>
                <button className='board-info-confirm-button accept' onClick={handleConfirmHint}>Show hint</button>
                <button className='board-info-confirm-button cancel' onClick={handleCancelConfirmHint}>Cancel</button>
            </form>
        </section> : <></>}
        {confirmViewCryptid ?
        <section className='board-info-confirm'>
            <section className='header'>
                <h2>View Cryptid</h2>
            </section>
            <section className='subheader'>
                Please ensure that all players have confirmed to reveal the Cryptid's true location!
            </section>
            <form className='board-info-confirm-buttons'>
                <button className='board-info-confirm-button accept' onClick={handleConfirmCryptid}>Reveal Cryptid</button>
                <button className='board-info-confirm-button cancel' onClick={handleCancelCryptid}>Cancel</button>
            </form>
        </section> : <></>}
        <section className='board-header'><h1>Cryptid</h1></section>
        <ul className='board-info-items'>
            <li className='board-info-item' style={{background: `${colours[props.gameState.playerTurn]}`}}>
            <section className='board-info-turn'>
                    <section className='header'>
                        <img className='header-icon' src={avatar} /><h2>TURN</h2>
                    </section>
                    <section className='text'>
                        {props.playerNames[playerNum-1] ? props.playerNames[playerNum-1] : `Player ${playerNum}`}
                        
                        {showPlayerDropdown ? handleShowPlayerDropdown()
                        :
                        <></>   
                        }  
                    </section>
            </section>

            </li>

            <li className='board-info-item'>
                <section className='board-info-decisions'>
                    <section className='header'>
                        <img className='header-icon' src={block}/><h2>DECISIONS</h2>
                    </section>
                    <ul className='board-info-decisions-list'>
                        <li className='board-info-decisions-item' onClick={() => props.setPlacePositive(!props.placePositive)}>
                            <a className='item-text' style={{color: `${props.placePositive ? colours[props.gameState.playerTurn] : ''}`}}>
                                Place a positive
                            </a>
                            {props.placePositive
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                        <li className='board-info-decisions-item' onClick={() => props.setPlaceNegative(!props.placeNegative)}>
                            <a className='item-text' style={{color: `${props.placeNegative ? colours[props.gameState.playerTurn] : ''}`}}>
                                Place a negative
                            </a>
                            {props.placeNegative
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                        <li className='board-info-decisions-item' onClick={() => props.setPlaceSearch(!props.placeSearch)}>
                            <a className='item-text' style={{color: `${props.placeSearch ? colours[props.gameState.playerTurn] : ''}`}}>
                                Make a search
                            </a>
                            {props.placeSearch
                            ?
                            <img className='selected-icon' src={arrow}></img>    
                            :
                            <></>
                            }
                        </li>
                    </ul>
                </section>
            </li>

            <li className='board-info-item'>
                <section className='board-info-information'>
                    <section className='header'>
                        <img className='header-icon' src={info}/><h2>INFORMATION</h2>
                    </section>
                    <ul className='board-info-information-list'>
                        <li className='board-info-information-item' onClick={handleViewClue}>
                            <a className='board-info-information-item-text'>
                                {!viewClue ? 'View my clue' : 'Hide my clue'}
                            </a>
                            {viewClue
                            ?
                            <div className={'board-info-information-item-accordion '+(hideAccordion ? ' hide-accordion' : '')} > 
                                {props.clues[props.gameState.playerTurn-1]}
                            </div> : <></>}
                        </li>

                        <li className='board-info-information-item' onClick={handleToggleShowAvailableGuesses}>
                            <a className='board-info-information-item-text' >
                                Toggle: Show only valid hexes based on clue {props.showAvailableGueses ? <div className='board-info-valid-status'>(Currently:  <div style={{color: `green`}}>on</div> )</div> : <div className='board-info-valid-status'>(Currently:  <div style={{color: `red`}}>off</div> )</div>}
                            </a>
                        </li>

                        {!viewHint
                            ?
                            <li className='board-info-information-item' onClick={handleViewHint}>
                                View the hint
                            </li> : <></>
                        }
                        <li className='board-info-information-item' onClick={handleViewCryptid}>
                            Reveal the Cryptid (end the game)
                        </li>
                    </ul>
                </section>
            </li>

            {viewHint ? 
            <li className='board-info-item'>
                <section className='header'>
                    <img className='header-icon' src={question}/><h2>HINT</h2>
                </section>
                <p className='board-info-hint'>
                    {props.hint}
                </p>
            </li> : <></>}

            <li className='board-info-item'>
                <section className='header'>
                    <img className='header-icon' src={hex}/><h2>HEX DATA</h2>
                </section>
                <section className='board-info-hex-info'>
                    {
                        props.hexHover === null 
                        ? 
                        'Hover over a hex to see information about that hex' 
                        : 
                        <section>
                            <section className='board-info-hex-info-header'>
                                Type: 
                                <div className='board-info-hex-info-text'>{props.hexHover.type}</div>
                            </section>
                            <section className='board-info-hex-info-header'>
                                Animal territory:
                                <div className='board-info-hex-info-text'>{props.hexHover.animalTerritory ? props.hexHover.animalTerritory : 'None'}</div>
                            </section>
                            <section className='board-info-hex-info-header'>
                                Pieces:
                                {props.hexHover.pieces.length > 0 ? props.hexHover.pieces.map((piece) => {
                                    return <div className='board-info-hex-info-text'>{piece.name}</div>
                                }) : <div className='board-info-hex-info-text'>None</div>}
                            </section>
                        </section> 
                    }
                </section>
            </li>
            

            

            <li className='board-info-item'>
                <section className='board-info-end-turn'>
                    <button className='board-info-end-turn-button' onClick={() => setShowPlayerDropdown(!showPlayerDropdown)}>Change Player</button>
                </section>
            </li>

            <li className='board-info-item'>
                <section className='board-info-end-turn'>        
                    <button className='board-info-end-turn-button' onClick={handleEndTurn}>End Turn</button>
                </section>
            </li>            
        </ul>
    </section>
  )
}
