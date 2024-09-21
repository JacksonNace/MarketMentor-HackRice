import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './components/navbar';
import './App.css';
import LoginButton from './components/loginButton';
import LogoutButton from './components/logoutButton';
import Chart from './components/chart';

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
      {!isAuthenticated ? (
        <LoginButton />
      ) : (
        <>
          <LogoutButton />
          {portfolioData && <Chart data={portfolioData} />}
          {stockData && <Chart data={stockData} />}
        </>
      )}
    </div>
  );
}

export default App;
