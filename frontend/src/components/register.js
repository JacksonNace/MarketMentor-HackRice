import React from 'react';
import "./Login.css";

function Login() {
  return (
    <div className="registerPage">
      <div className="registerBox">
        <h1 className="registerTitle">Register</h1>
        <h2 classname="registerPart">Username</h2>
        <input className="registerInputBox" placeholder="Username..." />
        <h2 classname="registerPart">Password</h2>
        <input className="registerInputBox" placeholder="Password" />
        <button className="registerSubmitButton">Register</button> 
      </div>
    </div>
  );
}

export default Login;

