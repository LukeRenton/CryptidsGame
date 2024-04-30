import React, { useState } from "react";
import '../Styles/Clues.css'
import PlantButton from "./PlantButton";


export default function Clues(props) {
    



    return (
        <div className="cards">
            <h2>Clue</h2>
            <p>{props.clues[0]}</p>
            <button>Fetch Clue</button>
        </div>
    );
}
