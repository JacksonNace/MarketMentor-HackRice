import React, { useState } from 'react';
import './navbar.css';

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
          MarketMentor
        </a>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for stocks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="/register">Register</a>
          </li>
          <li>
            <a href="/home1">Profile</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/home2">Home2</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;