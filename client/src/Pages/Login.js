import React from 'react'
import '../Styles/Login.css'
import ScrollLogin from '../Components/ScrollLogin'
import BackgroundVideo from '../Videos/cryptid-background.mp4'
import { handleLogin, handleSignup } from '../Services/LoginService'

// This component represents the login page.
export default function Login() {
  return (
    <section className='login-root'>
      <video autoPlay muted loop className='login-background-video'>
        <source src={BackgroundVideo} type="video/mp4" />
      </video>
      <section className='login-scroll-login'>
        <ScrollLogin handleLogin={handleLogin} handleSignup={handleSignup}></ScrollLogin>        
      </section>
    </section>
  )
}
