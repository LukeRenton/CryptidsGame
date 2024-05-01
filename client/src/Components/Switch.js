import React, { useState } from 'react'
import '../Styles/Switch.css'

export default function Switch( props ) {
    const [switchLeft, setSwitchLeft] = useState(true);

    const toggleSwitch = () => {
        setSwitchLeft(!switchLeft);
        props.onClick();
    } 

  return (
    <div className='switch-root'>
        <div className='switch-back' onClick={toggleSwitch}>
            <div className={'switch-ball '+(switchLeft ? 'switch-ball-left' : 'switch-ball-right')} onClick={toggleSwitch}></div>
        </div>
        <div className='switch-text'>
            {props.text}
        </div>
    </div>
  )
}
