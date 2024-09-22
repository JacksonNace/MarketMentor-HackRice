import React from 'react';
import LoginButton from '../components/loginButton';
import './Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-text">
        <h1 className="welcome-heading">Welcome to <span>Market Mentor</span></h1>
        <p>Start your investment journey with us and explore valuable insights. Please log in to begin.</p>
        <LoginButton />
      </div>
      <div className="welcome-image">
        <img
          src="https://www.dropbox.com/scl/fi/8ldionavts9xc6jtsgb4a/marketMentorLogo.jpg?rlkey=shcmiuqeur71mp5k50n1fyly6&st=aal1qrm5&raw=1" 
          alt="Image"
        />
      </div>
    </div>
  );
}

export default Welcome;
