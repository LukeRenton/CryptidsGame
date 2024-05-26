/*
SCROLLLOGIN.JS
Type: component
Description: Renders the form for login/signup and all animations 
*/

import React, { useState } from 'react'
import '../Styles/ScrollLogin.css'
import ScrollTop from '../Images/scroll_top.png'
import ScrollCenter from '../Images/scroll-center.png'
import ScrollBot from '../Images/scroll-bottom.png'
import PlantButton from './PlantButton'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

// Define and export the ScrollLogin functional component
export default function ScrollLogin( props ) {
  const navigate = useNavigate();
  // Define state variables using useState hook
  const [page, setPage] = useState('loadin-login');
  const [formInfo, setFormInfo] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [showSignupMessage, setShowSignupMessage] = useState(false);

  // Handle change in username input
  const handleUsernameChange = (event) => {
    if (event.target.value !== '') {
      setUsername(event.target.value);
    } else {
      setUsername(event.target.value);
    }
  }

  // Handle toggle between login and signup forms
  const handleToggleSignupClick = () => {
    setTimeout(() => {
      setFormInfo(page == 'signup' ? 'login' : 'signup');
    },1500)
    if (page === 'signup') {
      setPage('login');
    } else {
      setPage('signup');
    }
  }

  // Handle form submission for login
  const submitLoginForm = async (e) => {
    e.preventDefault();
    const res = await props.handleLogin(username,password); 
    if (res.status == 200) {
      props.updateUser(username);
      navigate('/lobby');
    } else {
      setShowLoginMessage(true);
      setTimeout(() => {
        setShowLoginMessage(false);
      },10000);
    }
  }

  // Handle form submission for signup
  const submitSignupForm = async (e) => {
    e.preventDefault();
    const res = await props.handleSignup(username,password);
    if (res.status == 201) {
      props.updateUser(username);
      navigate('/tutorial');
    } else {
      setShowSignupMessage(true);
      setTimeout(() => {
        setShowSignupMessage(false);
      },10000);
    }
  }

  // Style for the scroll center
  const style = {
    backgroundImage: "url("+ScrollCenter+")",
    backgroundRepeat: "no-repeat"
  };
  return (
    <div className='scroll-login-root'>
      <div className='scroll-login-top'>
        <img className='scroll-login-top-img' alt='The top of an ancient scroll' src={ScrollTop}></img>
      </div>
      <div className={(page === 'signup' ? ' scroll-login-signup' : (page === 'login' ? 'scroll-login-login' : 'scroll-login-center'))} style={style}>
        <div className='scroll-login-form-container'>
          <div className='scroll-cryptid-header'>CRYPTID</div>
          {formInfo==='login' ? <>
            <div className='scroll-login-header'>Log In</div>
            <form className='scroll-login-form' onSubmit={submitLoginForm}>
            <label className='scroll-label username'>Username</label>
            <input className='scroll-input' value={username} onChange={handleUsernameChange}/>
            <label className='scroll-label password'>Password</label>
            <input className='scroll-input password'value={password} onChange={(e) => setPassword(e.target.value)}/>
            {showLoginMessage ? <ErrorMessage>Incorrect username or password</ErrorMessage> : <></>}
            <PlantButton type='submit'>Log in</PlantButton>
            <div className='scroll-login-register'>
              Need an account?<a className='scroll-login-register-link' onClick={handleToggleSignupClick}>Sign Up</a>
            </div>
            </form> </>
          : <>
          <div className='scroll-login-header'>Sign Up</div>
          <form className='scroll-login-form' onSubmit={submitSignupForm}>
            <label className='scroll-label username'>Username</label>
            <input className='scroll-input' value={username} onChange={handleUsernameChange}/>
            <label className='scroll-label password'>Password</label>
            <input className='scroll-input password'value={password} onChange={(e) => setPassword(e.target.value)}/>
            {showSignupMessage ? <ErrorMessage>Invalid credentials</ErrorMessage> : <></>}
            <PlantButton type='submit'>Sign Up</PlantButton>
            <div className='scroll-login-register'>
              Already have an account?<a className='scroll-login-register-link' onClick={handleToggleSignupClick}>Log In</a>
            </div>
          </form>
          </>}
        </div> 
      </div>
      <div className='scroll-login-bot'>
        <img className='scroll-login-bot-img' alt='The bottom of an ancient scroll' src={ScrollBot}></img>
      </div>
    </div>
  )
}
