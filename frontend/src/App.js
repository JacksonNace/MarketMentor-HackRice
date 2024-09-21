import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Chatbot from './components/chatbot';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import './App.css';

function App() {
  const { isAuthenticated } = useAuth0();
  const [stockData, setStockData] = useState(null);

  const handleSearch = (data) => {
    setStockData(data);
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <>
          <Navbar onSearch={handleSearch} />
          <Routes>
            <Route path="/home" element={<Home stockData={stockData} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} />} />
          </Routes>
          <Chatbot />
          <LogoutButton />
        </>
      )}
    </div>
  );
}

export default App;
