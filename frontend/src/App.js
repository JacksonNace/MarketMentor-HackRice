import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import LogoutButton from './components/logoutButton';
import Chatbot from './components/chatbot';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import './App.css';
import Welcome from './pages/Welcome';

function App() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const [stockData, setStockData] = useState(null);
  const [buyAmount, setBuyAmount] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [stockSymbol, setStockSymbol] = useState('');

  const handleSearch = (data) => {
    setStockData(data);
    setStockSymbol(data.symbol);
  };

  const handleBuyClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/buy/${stockSymbol}/${buyAmount}`);
      const text = await response.text(); // Get the raw response text
      console.log('Raw response:', text); // Log the raw response
      
      if (response.ok) {
        const data = JSON.parse(text); // Try to parse the response as JSON
        alert(data.message);
      } else {
        throw new Error(text);
      }
    } catch (error) {
      alert(`Error: ${error.message || 'Failed to place buy order'}`);
    }
  };

  const handleSellClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/sell/${stockSymbol}/${sellAmount}`);
      const text = await response.text(); // Get the raw response text
      console.log('Raw response:', text); // Log the raw response
      
      if (response.ok) {
        const data = JSON.parse(text); // Try to parse the response as JSON
        alert(data.message);
      } else {
        throw new Error(text);
      }
    } catch (error) {
      alert(`Error: ${error.message || 'Failed to place sell order'}`);
    }
  };

  const renderTradeButtons = () => {
    if (location.pathname === '/home' && stockData) {
      return (
        <div className="trade-buttons">
          <div className="trade-action">
            <input 
              type="number" 
              value={buyAmount} 
              onChange={(e) => setBuyAmount(e.target.value)}
              placeholder="$ (Float-USD)"
              className="trade-input"
            />
            <button onClick={handleBuyClick} style={{backgroundColor: '#90EE90', color: '#000', marginLeft: '10px'}}>Buy</button>
          </div>
          <br/> 
          <div className="trade-action">
            <input 
              type="number" 
              value={sellAmount} 
              onChange={(e) => setSellAmount(e.target.value)}
              placeholder="$ (Float-USD)"
              className="trade-input"
            />
            <button onClick={handleSellClick} style={{backgroundColor: '#FF6347', color: '#fff', marginLeft: '10px'}}>Sell</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Welcome/>
      ) : (
        <>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/home" element={<Home stockData={stockData} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} />} />
          </Routes>
          {renderTradeButtons()}
          <br/>
          <Chatbot />
          <br />
          <LogoutButton />
        </>
      )}
    </div>
  );
}

export default App;
