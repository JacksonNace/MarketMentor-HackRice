import React from 'react';
import "./login.css";
import LoginButton from './loginButton'; // Ensure the file path is correct

function Login() {
  return (
    <div className="loginPage">
      <div className="loginBox">
        <h1 className="loginTitle">Login</h1>
        
        <h2 className="loginPart">Username</h2>
        <input className="loginInputBox" placeholder="Username..." />

        <h2 className="loginPart">Password</h2>
        <input className="loginInputBox" placeholder="Password" type="password" />
        
        <LoginButton /> {/* Render the LoginButton component */}
      </div>
    </div>
  );
}

export default Login;
