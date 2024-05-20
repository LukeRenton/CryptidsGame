import React, { useState } from "react";
import '../Styles/Clues.css'
import PlantButton from "./PlantButton";

// Clues component for managing and displaying clues, hints, and the cryptid location in the game.
export default function Clues(props) {
    // State variables for managing the component's behavior and visibility of clues and hints.
    const [clueVisible, setClueVisible] = useState(false);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [showAllClues, setShowAllClues] = useState(false);
    const [clue, setClue] = useState('');
    const [verifyClue, setVerifyClue] = useState(false);

    const [showHint, setShowHint] = useState(false);
    const [verifyShowHint, setVerifyShowHint] = useState(false);
    // Function to update the clue visibility and index.

    const handleUpdateClues = () => {
        console.log('clue is '+clueVisible);
        if (clueVisible) {
            setCurrentClueIndex(currentClueIndex+1)
            // Show all clues if all individual clues have been revealed.    
            if (currentClueIndex == 3) {
                setShowAllClues(true);
            }
        }
    }

    // Function to toggle the visibility of the current clue.
    const toggleClueVisibility = () => {
        // Toggle the visibility of the clue
        // Automatically show the next clue after hiding the current one
        handleUpdateClues();
        setClueVisible(!clueVisible);
    };

    // Function to toggle and set a specific clue.
    const toggleSetClue = (update_clue) => {
        if (update_clue !== clue) {
            if (verifyClue) {
                setClue(update_clue);
                setVerifyClue(false);
            } else {
                setClue('Click again to show clue');
                setVerifyClue(true);
            }
        } else {
            setClue('');
            setVerifyClue(false);
        }
    }

    // Function to handle the visibility of the hint.
    const handleShowHint = () => {
        if (!showHint) {
            if (verifyShowHint) {
                setShowHint(true);
                setVerifyShowHint(false);
            } else {
                setVerifyShowHint(true);
            }
        } else {
            setShowHint(false);
            setVerifyShowHint(false);
        }
    }

    return (
        <>
            {
            !showAllClues ? <div className="cards">
                <h2>Clue</h2>
                <div>
                    <p className={"clues-clue-"+(clueVisible ? 'visible' : 'invisible')}>{`${props.clues[currentClueIndex]}`}</p>
                    <PlantButton onClick={toggleClueVisibility}>
                        {clueVisible ? 'Hide Clue' : `Show Clue for player ${currentClueIndex + 1}`}
                    </PlantButton>
                </div>
            </div>
            : <div>
                <div className="cards">
                    <h2>Clue</h2>
                    <div className="clues-all-clues">
                        <p className={"clues-clue-visible"}>{`${clue}`}</p>
                        {props.clues.map((this_clue, index) => {
                        return <PlantButton onClick={() => toggleSetClue(this_clue)}>{clue !== this_clue ? `Show clue for player ${index+1}` : `Hide clue for player ${index+1}`}</PlantButton>
                        })}
                    </div>
                    <h2>Hint</h2>
                    <p>{!verifyShowHint ? (showHint ? props.hint : '') : 'Click again to show hint. Make sure all players are aware of the hint.'}</p>
                    <PlantButton onClick={handleShowHint}>{!showHint ? 'Show Hint' : 'Hide Hint'}</PlantButton>
                    <h2>Cryptid Location</h2>
                        <p>The location of the cryptid is at Row: {props.row} Column: {props.col}</p>
                </div>
            </div>
            }
        </>
    );
}