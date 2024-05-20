import React, { useState } from 'react'
import '../Styles/Switch.css'

// Define and export the Switch functional component
export default function Switch( props ) {
    // Define a state variable 'switchLeft' to manage the position of the switch
    const [switchLeft, setSwitchLeft] = useState(true);

    // Function to toggle the switch position and call the onClick handler from props    
    const toggleSwitch = () => {
        setSwitchLeft(!switchLeft);
        props.onClick();
    } 

  return (
    <div className='switch-root'>
        <div className='switch-text'>
            {props.text}
        </div>
        <div className='switch-back' onClick={toggleSwitch}>
            <div className={'switch-ball '+(switchLeft ? 'switch-ball-left' : 'switch-ball-right')} onClick={toggleSwitch}></div>
        </div>
    </div>
  )
}
