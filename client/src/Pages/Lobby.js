import React, { useEffect, useRef, useState } from "react";
import "../Styles/Lobby.css";
import { useNavigate } from "react-router-dom";
import scroll_paper_img from '../Images/scroll-paper.png'
import PlantButton from "../Components/PlantButton";
import Switch from "../Components/Switch";

export default function Lobby( props ) {

    const [showPrivateOptions, setShowPrivateOptions] = useState(false);
    const [showTimedOptions, setShowTimedOptions] = useState(false);
    const [sliderChecked, setSliderChecked] = useState(false);
    const [numPlayers, setNumPlayers] = useState(0);
    
    const navigate = useNavigate();

    const handleBack = () => {
      navigate('/');
    };

    const handleShowPrivateOptions = () => {
        setShowPrivateOptions(true);
        setTimeout(() => {
            setShowTimedOptions(true);
        },200)
    }

    const toggleSlider = () => {
        setSliderChecked(!sliderChecked);
    }

    const handleStartPrivateGame = (e) => {
        e.preventDefault();
        props.setLocalGameInfo({mode: sliderChecked ? 'normal' : 'intro', players: numPlayers});
        navigate('/game');
    }
  
return (
<div className="lobby-container">
    <div className="lobby-header">
        <div className="lobby-title">Play</div>
        <div className="lobby-version">v2024.3.50 (build num: 1st Africa)</div>
    </div>
    <div className="lobby-body">
    <div className="lobby-public-private">

        <div className="lobby-card" style={{backgroundImage: `url(${scroll_paper_img})`}}>
            <div className="lobby-section"> 
                <h1 className="lobby-public">Host a Game</h1>
                <PlantButton>HOST</PlantButton>
            </div>
        </div>

        <div className="lobby-card" style={{backgroundImage: `url(${scroll_paper_img})`}}>
            <div className="lobby-section"> 
                <h1 className="lobby-public">Find a Game</h1>
                <PlantButton>FIND</PlantButton>
            </div>
        </div>

        <div className={"lobby-card "+(showPrivateOptions ? 'lobby-card-flipped' : '')} style={{backgroundImage: `url(${scroll_paper_img})`}}>
            { !showTimedOptions ? <div className="lobby-section"> 
                <h1 className="lobby-public">Start a private Game</h1>
                <PlantButton onClick={handleShowPrivateOptions}>START</PlantButton>
            </div>
            :
            <div className="lobby-section"> 
                <h1 className="lobby-public">Private Game</h1>
                <h2 className="lobby-public">Options</h2>
                <form className="lobby-private-form">
                    <Switch text={'Advanced mode'} onClick={toggleSlider}/>
                    <input className="lobby-input" placeholder="Number of players..." value={numPlayers} onChange={(e) => setNumPlayers(e.target.value)}></input>
                    <PlantButton type={'submit'} onClick={handleStartPrivateGame}>Start private game</PlantButton>
                </form>
            </div>
            }
        </div>

        {/* <div className="lobby-card">
            <img className="lobby-card-background" src={scroll_paper_img}></img>
            <div className="lobby-section"> 
                <h1 className="lobby-public">Host a Game</h1>
                <a className="lobby-fancy" href="#">
                    <span className="lobby-top-key"></span>
                    <span className="lobby-text">Create Game</span>
                    <span className="lobby-bottom-key-1"></span>
                    <span className="lobby-bottom-key-2"></span>
                </a>
            </div>
        </div>

        <div className="lobby-card"> 
            <div className="lobby-section"> 
                <h1 className="lobby-public">Find a Game</h1>
                <a className="lobby-fancy" href="#">
                    <span className="lobby-top-key"></span>
                    <span className="lobby-text">Join Game</span>
                    <span className="lobby-bottom-key-1"></span>
                    <span className="lobby-bottom-key-2"></span>
                </a>
            </div>
        </div>

        <div className="lobby-card"> 
            <div className="lobby-section"> 
                <h1 className="lobby-private">Start private Game</h1>
                <a className="lobby-fancy" href="#">
                    <span className="lobby-top-key"></span>
                    <span className="lobby-text">Enter Code</span>
                    <span className="lobby-bottom-key-1"></span>
                    <span className="lobby-bottom-key-2"></span>
                </a>
            </div>
        </div> */}

    </div>
</div>


    <div className="lobby-back">
        <button className="lobby-Btn" onClick={handleBack}>
            <div className="lobby-sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="lobby-text-btn">Back</div>
        </button>
    </div>
</div>
  );
}