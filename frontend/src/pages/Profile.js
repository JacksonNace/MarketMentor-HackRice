import React, { useState, useEffect, useRef } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { createChart } from 'lightweight-charts';

function Profile({ isAuthenticated }) {
  const { user } = useAuth0();
  const [portfolioData, setPortfolioData] = useState(null);
  const chartContainerRef = useRef();
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        setPortfolioData(data);
        console.log('Retrieved portfolio data:', data);
        
        // Create and update chart
        if (chartContainerRef.current && !chartInstanceRef.current) {
          chartInstanceRef.current = createChart(chartContainerRef.current, { 
            width: 600, // Set a fixed width
            height: 300,
            layout: {
              background: { color: '#ffffff' },
              textColor: '#333',
            },
            grid: {
              vertLines: { color: '#e0e0e0' },
              horzLines: { color: '#e0e0e0' },
            },
            rightPriceScale: {
              visible: true,
            },
            timeScale: {
              visible: true,
              borderColor: '#D1D4DC',
            },
          });
          
          const lineSeries = chartInstanceRef.current.addLineSeries({ color: '#2962FF' });
          const currentDate = new Date(data.date);
          const weekData = [];

          for (let i = 6; i >= 0; i--) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            weekData.push({
              time: date.toISOString().split('T')[0],
              value: parseFloat(data.equity)
            });
          }

          lineSeries.setData(weekData);
          
          chartInstanceRef.current.timeScale().fitContent();
        }
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      }
    };

    if (isAuthenticated) {
      fetchPortfolioData();
    }

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.remove();
        chartInstanceRef.current = null;
      }
    };
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
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <div 
              ref={chartContainerRef} 
              style={{ 
                width: '600px', 
                height: '300px',
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
