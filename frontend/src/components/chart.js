import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

function Chart({ data }) {
	const chartContainerRef = useRef();
	const chartRef = useRef(null);

	useEffect(() => {
		if (data && chartContainerRef.current) {
			const chart = createChart(chartContainerRef.current, {
				width: 800,  // Increased from 600
				height: 400, // Increased from 300
				layout: {
					background: { color: '#ffffff' },
					textColor: '#333',
				},
				grid: {
					vertLines: { color: '#e0e0e0' },
					horzLines: { color: '#e0e0e0' },
				},
			});

			const lineSeries = chart.addLineSeries({
				color: '#2962FF',
				lineWidth: 2,
			});

			if (data.history) {
				// Stock data
				const chartData = data.history.map(item => ({
					time: item.date,
					value: item.close,
				}));
				lineSeries.setData(chartData);
			} else {
				// Portfolio data
				const baseTimestamp = new Date(data.date).getTime() / 1000;
				lineSeries.setData([
					{ time: baseTimestamp - 86400, value: parseFloat(data.last_equity) },
					{ time: baseTimestamp, value: parseFloat(data.equity) },
				]);
			}

			chart.timeScale().fitContent();
			chartRef.current = chart;
		}

		return () => {
			if (chartRef.current) {
				chartRef.current.remove();
				chartRef.current = null;
			}
		};
	}, [data]);

	return (
		<div className="chart-wrapper">
			<h2>{data.symbol ? `${data.symbol} Stock Price` : 'Portfolio Overview'}</h2>
			<div className="chart-container" ref={chartContainerRef}></div>
		</div>
	);
}

export default Chart;