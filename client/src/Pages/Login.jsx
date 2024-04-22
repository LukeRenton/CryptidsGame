import React, { useState } from 'react';
import '../Styles/Login.css'

export const LoginComponent = () =>  {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    //backend handling here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div class="login-box">
  <p>Login</p>
  <form>
    <div class="user-box">
      <input required="" name="" type="text"/>
      <label>Email</label>
    </div>
    <div class="user-box">
      <input required="" name="" type="password"/>
      <label>Password</label>
    </div>
    <a href="#">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      Submit
    </a>
  </form>
  <p>Don't have an account? <a href="" class="a2">Sign up!</a></p>
</div>
  );
}
