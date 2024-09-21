import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './components/navbar';
import './App.css';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Chart from './components/chart';
import { Route, Routes } from 'react-router-dom';
import Chatbot from './components/chatbot';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';

function App() {
  const { isAuthenticated } = useAuth0();
  const [portfolioData, setPortfolioData] = useState(null);
  const [stockData, setStockData] = useState(null);

  const handleSearch = (data) => {
    setStockData(data);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes> 
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <>
          <LogoutButton />
          {portfolioData && <Chart data={portfolioData} />}
          {stockData && <Chart data={stockData} />}

        </>
      )}
      <Chatbot />
    </div>
  );
}

export default App;
