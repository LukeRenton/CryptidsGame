import React, { useState } from 'react'
import '../Styles/Lobby.css'
import forest_animation from '../Videos/forest_animation.mp4'
import host_online from '../Images/LobbyHeaders/host_online.png'
import join_online from '../Images/LobbyHeaders/join_online.png'
import local from '../Images/LobbyHeaders/local.png'
import background from '../Videos/wall-background.mp4'

export default function Lobby() {
    const [playHostOnline, setPlayHostOnline] = useState(false);
    const [playJoinOnline, setPlayJoinOnline] = useState(false);
    const [playLocal, setPlayLocal] = useState(false);



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


  return (
    <div className='lobby-root'>
        <video autoPlay muted loop className='lobby-background'>
            <source src={background} type="video/mp4" />
        </video>
        <div className='lobby-items'>
            <div className='top-row'>
                <div className='lobby-item lobby-join-online'>
                    <div className='lobby-join-online-back'>
                        <video muted loop className={'lobby-video '+(!playJoinOnline ? 'grayed-out' : '')} onMouseEnter={handleHoverJoinOnline} onMouseLeave={handleLeaveJoinOnline}>
                            <source src={forest_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-join-online-text '+(!playJoinOnline ? '' : 'zoomed-in')} src={join_online} />
                    </div>
                </div>
                <div className='lobby-item lobby-local'>
                    <div className='lobby-local-back'>
                        <video muted loop className={'lobby-video '+(!playLocal ? 'grayed-out' : '')} onMouseEnter={handleHoverLocal} onMouseLeave={handleLeaveLocal}>
                            <source src={forest_animation} type="video/mp4" />
                        </video>
                        <img className={'lobby-local-text '+(!playLocal ? '' : 'zoomed-in')} src={local} />
                    </div>
                </div>
            </div>
            <div className='bottom-row'>
                <div className='lobby-item lobby-host-online'>
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
