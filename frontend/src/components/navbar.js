import React, { useState } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
import LogoutButton from './logoutButton';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      try {
        const response = await fetch(`http://localhost:5000/stock/${searchTerm}/history`);
        const data = await response.json();
        if (data.error) {
          console.error('Error fetching stock data:', data.error);
          // You might want to show an error message to the user here
        } else {
          onSearch(data);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        // You might want to show an error message to the user here
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo">
          Market Mentor
        </a>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search for stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </div>
        </form>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            {/* <Link to="/search">Search</Link> */}
            <LogoutButton/>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
