import React, { useState } from "react";
import '../Styles/Clues.css'
import PlantButton from "./PlantButton";


export default function Clues(props) {
    
    const [clueVisible, setClueVisible] = useState(false);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);

    const toggleClueVisibility = () => {
        // Toggle the visibility of the clue
        setClueVisible((prevVisible) => !prevVisible);
        // Automatically show the next clue after hiding the current one
        if (!clueVisible) {
            setCurrentClueIndex((prevIndex) => (prevIndex + 1) % props.clues.length);
        }
    };

    return (
        <div className="cards">
            <h2>Clue</h2>
            {clueVisible && <p>{`Show clue for player ${props.playerNumber}: ${props.clues[currentClueIndex]}`}</p>}
            <PlantButton onClick={toggleClueVisibility}>
                {clueVisible ? 'Hide Clue' : 'Show Clue'}
            </PlantButton>
        </div>
    );
}