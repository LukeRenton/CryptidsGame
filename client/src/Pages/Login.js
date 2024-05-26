/*
LOGIN.JS
Type: page
Description: Renders the login page for login/signup
*/

import React, { useEffect } from 'react'
import '../Styles/Login.css'
import ScrollLogin from '../Components/ScrollLogin'
import BackgroundVideo from '../Videos/cryptid-background.mp4'
import { handleLogin, handleSignup } from '../Services/LoginService'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

// This component represents the login page.
export default function Login( props ) {
  const navigate = useNavigate();

  // On component mount, get "user" Cookie if available
  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser !== '') {
      props.updateUser(cookieUser);
      navigate('/lobby');
    }
  },[])

  return (
    <section className='login-root'>
      <video autoPlay muted loop className='login-background-video'>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <section className='login-scroll-login'>
        <ScrollLogin updateUser={props.updateUser} handleLogin={handleLogin} handleSignup={handleSignup}></ScrollLogin>        
      </section>
    </section>
  )
}
