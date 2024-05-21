import React, { useState } from 'react'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


import '../Styles/Lobby.css'
import forest_animation from '../Videos/forest_animation.mp4'
import beach_animation from '../Videos/beach_animation.mp4'
import mountain_animation from '../Videos/mountain_animation.mp4'
import host_online from '../Images/LobbyHeaders/host_online.png'
import join_online from '../Images/LobbyHeaders/join_online.png'
import local from '../Images/LobbyHeaders/local.png'
import background from '../Videos/wall-background.mp4'
import lobbyback from '../Images/LobbyBack-transformed-resized.jpeg'
import Switch from '../Components/Switch'
import PlantButton from '../Components/PlantButton'
import { useNavigate } from 'react-router-dom'

export default function Lobby( props ) {
    // State variables initialization
    const navigate = useNavigate();
    const [playHostOnline, setPlayHostOnline] = useState(false);
    const [playJoinOnline, setPlayJoinOnline] = useState(false);
    const [playLocal, setPlayLocal] = useState(false);
    const [showSettings, setShowSettings] = useState('');
    const [sliderChecked, setSliderChecked] = useState(false);
    const [numPlayers, setNumPlayers] = useState(2);
    const [playerNames, setPlayerNames] = useState(["","","","",""]);

     // Handlers for video hover events
    const handleHoverHostOnline = (event) => {
        event.target.play();
        setPlayHostOnline(true);
    }

    // Handle when mouse leaves the host online window
    const handleLeaveHostOnline = (event) => {
        event.target.pause();
        setPlayHostOnline(false);
    }

    // Handle when mouse enters the host online window
    const handleHoverJoinOnline = (event) => {
        event.target.play();
        setPlayJoinOnline(true);
    }

    // Handle when mouse leaves the join online window
    const handleLeaveJoinOnline = (event) => {
        event.target.pause();
        setPlayJoinOnline(false);
    }

    // Handle when mouse enters the local window
    const handleHoverLocal = (event) => {
        event.target.play();
        setPlayLocal(true);
    }

    // Handle when mouse leaves the local window
    const handleLeaveLocal = (event) => {
        event.target.pause();
        setPlayLocal(false);
    }

    // Toggle slider
    const toggleSlider = () => {
        setSliderChecked(!sliderChecked);
    }

    // Start a private game
    const handleStartPrivateGame = (e) => {
        e.preventDefault();
        props.setLocalGameInfo({mode: sliderChecked ? 'normal' : 'intro', players: numPlayers});
        const newMovesList = [];
        for (let i = 0; i < numPlayers; i++) {
            newMovesList.push([]);
        }
        props.setMovesList(newMovesList);
        navigate('/game');
    }

    // Update the number of players as required
    const updateNumPlayers = (newNumPlayers) => {
        setNumPlayers(newNumPlayers);
    }

    // Update the players name
    const updatePlayerName = (playerNum, playerName) => {
        const newPlayerNames = props.playerNames;
        newPlayerNames[playerNum-1] = playerName;
        props.setPlayerNames(newPlayerNames);
    }

    // Render the player name inputs
    const renderPlayerNames = () => {
        const newPlayerData = [];
        for (let i = 0; i < numPlayers; i++) {
            newPlayerData.push({playerNum: i+1});
        }

        return newPlayerData.map((player) => {
            return  <div className='lobby-settings-player-names-item'>
                        <div className='lobby-settings-player-names-item-name'>
                            Player {player.playerNum} name:
                        </div>
                        <input className='lobby-settings-player-names-item-input'  onChange={(e) => updatePlayerName(player.playerNum, e.target.value)}/>
                    </div>
        })
    }

    // Render settings based on state
    const renderSettings = () => {
        if (showSettings === 'local') {
            return  <div className='lobby-settings-local'>
                        <h1 className="lobby-settings-header">Local Game</h1>
                        <h2 className="lobby-settings-subheader">Options</h2>
                        <form className="lobby-settings-form">
                            <Switch text={'Advanced mode'} onClick={toggleSlider}/>
                            <div className='lobby-settings-num-players'>
                                <div className='lobby-settings-num-players-text'>Number of players: </div>
                                <ul className='lobby-settings-num-players-selector'>
                                    <li className={numPlayers === 2 ? 'selected' : ''} onClick={() => {updateNumPlayers(2)}}>2</li>
                                    <li className={numPlayers === 3 ? 'selected' : ''} onClick={() => {updateNumPlayers(3)}}>3</li>
                                    <li className={numPlayers === 4 ? 'selected' : ''} onClick={() => {updateNumPlayers(4)}}>4</li>
                                    <li className={numPlayers === 5 ? 'selected' : ''} onClick={() => {updateNumPlayers(5)}}>5</li>
                                </ul>
                            </div>
                            <div className='lobby-settings-player-names'>
                                {renderPlayerNames()}
                            </div>
                            <button className='lobby-settings-button' type='submit' onClick={handleStartPrivateGame}>Start local game</button>
                        </form>
                    </div>
        }
    }


  return (
    <div className='lobby-root'>
        {showSettings !== '' ? <div className='back-blur' onClick={() => {setShowSettings('')}}></div> : <></>}
        {renderSettings()}
        <div className='lobby-go-tutorial'>
            <button className='lobby-go-tutorial-button' onClick={() => navigate('/tutorial')}>
                Go to tutorial
            </button>
        </div>
        <img className='lobby-background' src={lobbyback}></img>
        <div className='lobby-items'>
            <div className='top-row'>
                <div className='lobby-item lobby-join-online'>
                    <div className='lobby-join-online-back'>
                        <video muted loop className={'lobby-video '+(!playJoinOnline ? 'grayed-out' : '')} onMouseEnter={handleHoverJoinOnline} onMouseLeave={handleLeaveJoinOnline}>
                            <source src={beach_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-join-online-text '+(!playJoinOnline ? '' : 'zoomed-in')} src={join_online} />
                    </div>
                </div>
                <div className='lobby-item lobby-local' onClick={() => setShowSettings('local')}>
                    <div className='lobby-local-back'>
                        <video muted loop className={'lobby-video '+(!playLocal ? 'grayed-out' : '')} onMouseEnter={handleHoverLocal} onMouseLeave={handleLeaveLocal}>
                            <source src={mountain_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-local-text '+(!playLocal ? '' : 'zoomed-in')} src={local} />
                    </div>
                </div>
            </div>
            <div className='bottom-row'>
                <div className='lobby-item lobby-host-online '>
                    <div className='lobby-host-online-back'>
                        <video muted loop className={'lobby-video '+(!playHostOnline ? 'grayed-out' : '')} onMouseEnter={handleHoverHostOnline} onMouseLeave={handleLeaveHostOnline}>
                            <source src={forest_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-host-online-text '+(!playHostOnline ? '' : 'zoomed-in')} src={host_online} />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
