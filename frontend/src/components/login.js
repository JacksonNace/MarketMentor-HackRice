import React from 'react';
import "./Login.css";

function login() {
  return (
    <div className="loginPage">
      <div className="loginBox">
        <h1 className="loginTitle">Login</h1>
        <h2 classname="loginPart">Username</h2>
        <input className="loginInputBox" placeholder="Username..." />
        <h2 classname="loginPart">Password</h2>
        <input className="loginInputBox" placeholder="Password" />
        <button className="loginSubmitButton">Log in</button> 
      </div>
    </div>
  )
}

export default login
