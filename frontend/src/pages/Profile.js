import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        const data = await response.json();
        setPortfolioData(data);
        console.log('Retrieved portfolio data:', data);  // Log the data
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
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      )}
      {portfolioData && (
        <div className="portfolio-info">
          <h2>Portfolio Summary</h2>
          <p>Data retrieved. Check the console for details.</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
