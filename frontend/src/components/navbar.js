import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (

<nav className="navbar">
  <div className="navbar-left">
    <a href="/" className="logo">
      MarketMentor
    </a>
  </div>
  <div className="navbar-center">
    <div className='search'>

    </div>
  </div>
  <div className="navbar-right">
  <ul className="nav-links">
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/home1">home1</a>
      </li>
      <li>
        <a href="/home2">home2</a>
      </li>
    </ul>
  </div>
</nav>
);
};

export default Navbar;