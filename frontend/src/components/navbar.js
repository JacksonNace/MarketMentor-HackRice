import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          MarketMentor
        </Link>
      </div>
      <div className="navbar-center">
        <div className='search'>
          {/* Add search functionality here */}
        </div>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <Link to="/home">Register</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/home2">Home2</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
