import React from 'react';
import Chart from '../components/chart';

function Home({ stockData }) {
  return (
    <div className="home">
      <h1>Welcome to MarketMentor</h1>
      {stockData ? (
        <div>
          <h2>Search Results</h2>
          <Chart data={stockData} />
          {/* Display other stock data as needed */}
        </div>
      ) : (
        <p>Search for a stock to see results</p>
      )}
    </div>
  );
}

export default Home;