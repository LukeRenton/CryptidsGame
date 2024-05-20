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

     // Handlers for video hover events
    const handleHoverHostOnline = (event) => {
        event.target.play();
        setPlayHostOnline(true);
    }

    const handleLeaveHostOnline = (event) => {
        event.target.pause();
        setPlayHostOnline(false);
    }

    const handleHoverJoinOnline = (event) => {
        event.target.play();
        setPlayJoinOnline(true);
    }

    const handleLeaveJoinOnline = (event) => {
        event.target.pause();
        setPlayJoinOnline(false);
    }

    const handleHoverLocal = (event) => {
        event.target.play();
        setPlayLocal(true);
    }

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
        navigate('/game');
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
                                    <li className={numPlayers === 2 ? 'selected' : ''} onClick={() => {setNumPlayers(2)}}>2</li>
                                    <li className={numPlayers === 3 ? 'selected' : ''} onClick={() => {setNumPlayers(3)}}>3</li>
                                    <li className={numPlayers === 4 ? 'selected' : ''} onClick={() => {setNumPlayers(4)}}>4</li>
                                    <li className={numPlayers === 5 ? 'selected' : ''} onClick={() => {setNumPlayers(5)}}>5</li>
                                </ul>
                            </div>
                            {/* <PlantButton type={'submit'} onClick={handleStartPrivateGame}>Start private game</PlantButton> */}
                            <button className='lobby-settings-button' type='submit' onClick={handleStartPrivateGame}>Start local game</button>
                        </form>
                    </div>
        }
    }


  return (
    <div className='lobby-root'>
        {/* <video autoPlay muted loop className='lobby-background'>
            <source src={background} type="video/mp4" />
        </video> */}
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
