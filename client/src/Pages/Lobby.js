/*
LOBBY.JS
Type: page
Description: Renders the lobby page for entering a game mode (local, online [host/join])
*/

import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'


import '../Styles/Lobby.css'
import forest_animation from '../Videos/forest_animation.mp4'
import beach_animation from '../Videos/beach_animation.mp4'
import mountain_animation from '../Videos/mountain_animation.mp4'
import host_online from '../Images/LobbyHeaders/host_online.png'
import join_online from '../Images/LobbyHeaders/join_online.png'
import local from '../Images/LobbyHeaders/local.png'
import Switch from '../Components/Switch'
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

    const handleGoToLogin = () => {
        props.updateUser('');
        navigate('/');
    }

    // Handle escape key to close "game settings" window
    useEffect(() => {
        const handleEsc = (event) => {
           if (event.key === 'Escape') {
            setShowSettings('');
          }
        };
        window.addEventListener('keydown', handleEsc);
    
        return () => {
          window.removeEventListener('keydown', handleEsc);
        };
      }, []);


  return (
    <section className='lobby-root'>
        <div className='lobby-background'></div>
        {/* <img className='lobby-background' src={lobbyback}></img> */}
        {/* <video muted autoPlay loop className='lobby-background'> */}
            {/* <source src={beach_animation} type="video/mp4" /> */}
        {/* </video> */}
        <section className='lobby-items'>
            <section className='top-row'>
                <a className='lobby-item lobby-join-online'>
                    <div className='lobby-join-online-back'>
                        <video muted loop className={'lobby-video '+(!playJoinOnline ? 'grayed-out' : 'not-grayed-out')} onMouseEnter={handleHoverJoinOnline} onMouseLeave={handleLeaveJoinOnline}>
                            <source src={beach_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-join-online-text '+(!playJoinOnline ? '' : 'zoomed-in')} alt="Header for join online option" src={join_online} />
                    </div>
                </a>
                <a className='lobby-item lobby-local' onClick={() => setShowSettings('local')}>
                    <div className='lobby-local-back'>
                        <video muted loop className={'lobby-video '+(!playLocal ? 'grayed-out' : 'not-grayed-out')} onMouseEnter={handleHoverLocal} onMouseLeave={handleLeaveLocal}>
                            <source src={mountain_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-local-text '+(!playLocal ? '' : 'zoomed-in')} alt="Header for join local option" src={local} />
                    </div>
                </a>
            </section>
            <section className='bottom-row'>
                <a className='lobby-item lobby-host-online '>
                    <div className='lobby-host-online-back'>
                        <video muted loop className={'lobby-video '+(!playHostOnline ? 'grayed-out' : 'not-grayed-out')} onMouseEnter={handleHoverHostOnline} onMouseLeave={handleLeaveHostOnline}>
                            <source src={forest_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-host-online-text '+(!playHostOnline ? '' : 'zoomed-in')} alt="Header for host online option" src={host_online} />
                    </div>
                </a>
            </section>
        </section>
        <section className='lobby-go-tutorial'>
            <ul class="example-2">
                <li class="icon-content" onClick={() => navigate('/tutorial')}>
                    <a
                    data-link="tutorial"
                    >
                    <div class="filled"></div>
                    <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                    width="800px" height="800px" viewBox="0 0 973.1 973.1"
                                >
                        <g>
                            <path d="M502.29,788.199h-47c-33.1,0-60,26.9-60,60v64.9c0,33.1,26.9,60,60,60h47c33.101,0,60-26.9,60-60v-64.9
                                C562.29,815,535.391,788.199,502.29,788.199z"/>
                            <path d="M170.89,285.8l86.7,10.8c27.5,3.4,53.6-12.4,63.5-38.3c12.5-32.7,29.9-58.5,52.2-77.3c31.601-26.6,70.9-40,117.9-40
                                c48.7,0,87.5,12.8,116.3,38.3c28.8,25.6,43.1,56.2,43.1,92.1c0,25.8-8.1,49.4-24.3,70.8c-10.5,13.6-42.8,42.2-96.7,85.9
                                c-54,43.7-89.899,83.099-107.899,118.099c-18.4,35.801-24.8,75.5-26.4,115.301c-1.399,34.1,25.8,62.5,60,62.5h49
                                c31.2,0,57-23.9,59.8-54.9c2-22.299,5.7-39.199,11.301-50.699c9.399-19.701,33.699-45.701,72.699-78.1
                                C723.59,477.8,772.79,428.4,795.891,392c23-36.3,34.6-74.8,34.6-115.5c0-73.5-31.3-138-94-193.4c-62.6-55.4-147-83.1-253-83.1
                                c-100.8,0-182.1,27.3-244.1,82c-52.8,46.6-84.9,101.8-96.2,165.5C139.69,266.1,152.39,283.5,170.89,285.8z"/>
                        </g>
                        </svg>
                    </a>
                    <div class="tooltip">Tutorial</div>
                </li>
                <li class="icon-content" onClick={handleGoToLogin}>
                    <a
                    data-link="logout"
                    >
                    <div class="filled"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="logout"><g><g><rect width="24" height="24" opacity="0" transform="rotate(90 12 12)"></rect><path d="M7 6a1 1 0 0 0 0-2H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h2a1 1 0 0 0 0-2H6V6zM20.82 11.42l-2.82-4a1 1 0 0 0-1.39-.24 1 1 0 0 0-.24 1.4L18.09 11H10a1 1 0 0 0 0 2h8l-1.8 2.4a1 1 0 0 0 .2 1.4 1 1 0 0 0 .6.2 1 1 0 0 0 .8-.4l3-4a1 1 0 0 0 .02-1.18z"></path></g></g></svg>
                    </a>
                    <div class="tooltip">Logout</div>
                </li>
            </ul>
        </section>
        {showSettings !== '' ? <div className='back-blur' onClick={() => {setShowSettings('')}}></div> : <></>}
        {renderSettings()}
    </section>
  )
}
