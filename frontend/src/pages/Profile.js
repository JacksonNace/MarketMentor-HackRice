import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { createChart } from 'lightweight-charts';

function Profile({ isAuthenticated }) {
  const { user } = useAuth0();
  const [portfolioData, setPortfolioData] = useState(null);
  const chartContainerRef = useRef();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        setPortfolioData(data);
        console.log('Retrieved portfolio data:', data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    if (isAuthenticated) {
      fetchPortfolioData();
    }
  }, [isAuthenticated]);


  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h1>Profile</h1>
      {user && (
        <div className="user-info">
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
      {portfolioData && (
        <div className="portfolio-info">
          <h2>Portfolio Summary</h2>
          <p>Account ID: {portfolioData.id}</p>
          <p>Cash: ${parseFloat(portfolioData.cash).toFixed(2)}</p>
          <p>Equity: ${parseFloat(portfolioData.equity).toFixed(2)}</p>
          <p>Last Equity: ${parseFloat(portfolioData.last_equity).toFixed(2)}</p>
          <p>Date: {portfolioData.date}</p>
          <div ref={chartContainerRef} />
        </div>
      )}
    </div>
  );
}

export default Profile;
