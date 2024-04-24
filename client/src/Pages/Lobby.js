import React, { useEffect, useRef } from "react";
import "../Styles/Lobby.css";
import { useNavigate } from "react-router-dom";

export default function Lobby() {

    const navigate = useNavigate();

    const handleBack = () => {
      navigate('/');
    };
  
return (
<div className="container">
    <div className="header">
        <div className="title">Play</div>
        <div className="version">v2024.3.50 (build num: 1st Africa)</div>
    </div>
    <div className="body">
    <div className="public-private">

        <div className="card">
            <div className="section"> 
                <h1 className="public">Host a Game</h1>
                <a className="fancy" href="#">
                    <span className="top-key"></span>
                    <span className="text">Create Game</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                </a>
            </div>
        </div>

        <div className="card"> 
            <div className="section"> 
                <h1 className="public">Find a Game</h1>
                <a className="fancy" href="#">
                    <span className="top-key"></span>
                    <span className="text">Join Game</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                </a>
            </div>
        </div>

        <div className="card"> 
            <div className="section"> 
                <h1 className="private">Start private Game</h1>
                <a className="fancy" href="#">
                    <span className="top-key"></span>
                    <span className="text">Enter Code</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                </a>
            </div>
        </div>

    </div>
</div>


    <div className="back">
        <button className="Btn" onClick={handleBack}>
            <div className="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>
            <div className="text-btn">Back</div>
        </button>
    </div>
</div>
  );
}