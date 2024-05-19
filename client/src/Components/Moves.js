import React, { useState } from 'react'
import '../Styles/Moves.css'
import dropdown from '../Icons/dropdown.png'
import { colours } from '../Models/PlayerColours'

export default function Moves( props ) {

    const [showPlayerMoves, setShowPlayerMoves] = useState(-1);

    const handleClick = (playerNum) => {
        setShowPlayerMoves(playerNum-1);
    }

return (
    <div className='moves-root'>
        <div className='board-header'><h1>End of Game</h1></div>
        <div className='moves-items'>
            <div className='header'>Player Move History</div>
            <ul className='moves-player-list'>
                    {props.movesList.map((player, index) => {
                        return <li className='moves-player-item'>
                            <div className='moves-player-header' onClick={() => handleClick(index+1)} style={{background: `${colours[index+1]}`}}>
                                <div className='moves-player-header-text'>
                                    Player {index+1} {props.playerNames[index] ? `(${props.playerNames[index]})` : ''}
                                </div>
                                <img className='moves-player-head-icon' src={dropdown}></img>
                            </div>
                            <ol className={'moves-player-moves-list '+(showPlayerMoves === index ? 'open-accordion' : 'closed-accordion')}>
                                {
                                    props.movesList[index].length > 0 ? props.movesList[index].map((move) => {
                                     return <li className='moves-player-moves-list-item'>
                                        {move}
                                     </li>   
                                    })
                                    :
                                    'No moves made'
                                }
                            </ol>
                        </li>
                    })
                }
                
            </ul>
        </div>
    </div>
  )
}
