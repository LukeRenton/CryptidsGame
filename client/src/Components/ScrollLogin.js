import React, { useState } from 'react'
import '../Styles/ScrollLogin.css'
import ScrollTop from '../Images/scroll_top.png'
import ScrollCenter from '../Images/scroll-center.png'
import ScrollBot from '../Images/scroll-bottom.png'
import PlantButton from './PlantButton'
import { useNavigate } from 'react-router-dom'


export default function ScrollLogin( props ) {
  const navigate = useNavigate();

  const [page, setPage] = useState('loadin-login');
  const [formInfo, setFormInfo] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tmp, setTmp] = useState('');

  const handleUsernameChange = (event) => {
    if (event.target.value !== '') {
      setUsername(event.target.value);
    } else {
      setUsername(event.target.value);
    }
  }

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

  const submitLoginForm = async (e) => {
    e.preventDefault();
    const res = await props.handleLogin(username,password);
    console.log(res);
    setTmp(res);
    if (res.status == 200) {
      navigate('/lobby');
    }
  }

  const submitSignupForm = async (e) => {
    e.preventDefault();
    const res = await props.handleSignup(username,password);
    if (res.status == 201) {
      navigate('/tutorial');
    }
  }

  const style = {
    backgroundImage: "url("+ScrollCenter+")",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className='scroll-login-root'>
      <div className='scroll-login-top'>
        <img className='scroll-login-top-img' alt='The top of an ancient scroll' src={ScrollTop}></img>
      </div>
      <div className={(page === 'signup' ? ' scroll-login-signup' : (page === 'login' ? 'scroll-login-login' : 'scroll-login-center'))} style={style}>
        <div className='scroll-login-form-container'>
          <div className='scroll-cryptid-header'>CRYPTID {tmp}</div>
          {formInfo==='login' ? <>
            <div className='scroll-login-header'>Log In</div>
            <form className='scroll-login-form' onSubmit={submitLoginForm}>
            <label className='scroll-label username'>Username</label>
            <input className='scroll-input' value={username} onChange={handleUsernameChange}/>
            <label className='scroll-label password'>Password</label>
            <input className='scroll-input password'value={password} onChange={(e) => setPassword(e.target.value)}/>
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
