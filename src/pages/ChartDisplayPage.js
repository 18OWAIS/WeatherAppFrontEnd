import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const ChartDisplayPage = () => {
  const city = useLocation().state;
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.tomorrow.io/v4/weather/history/recent?location=${city}&apikey=sDYTmFFnlZYLk4TufO4QwACINN6bREwR`);
        const data = await response.json();
        setWeatherData(data);
        setError(null);
      } catch (error) {
        setError('Error fetching weather data');
        console.error(error);
      }
    };

    fetchData();
  }, [city]);

  // Prepare data for Stacked Area Chart
  const prepareStackedAreaChartData = () => {
    if (!weatherData) return [];

    return weatherData.timelines.hourly.map(hourData => {
      return {
        time: new Date(hourData.time).toLocaleTimeString(),
        temperature: hourData.values.temperature,
        humidity: hourData.values.humidity,
      };
    });
  };

  // Prepare data for Pie Chart
  const preparePieChartData = () => {
    if (!weatherData) return [];

    const lastHourData = weatherData.timelines.hourly[weatherData.timelines.hourly.length - 1].values;
    return [
      { name: 'Temperature', value: lastHourData.temperature },
      { name: 'Humidity', value: lastHourData.humidity },
    ];
  };

  // Colors for Pie Chart
  const COLORS = ['#0088FE', '#00C49F'];

  return (
    <div>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>Weather Report for {city}</h1>
      {weatherData && (
        <div>
          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Temperature and Humidity</h2>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={prepareStackedAreaChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="temperature" stackId="1" stroke="#8884d8" fill="#8884d8" />
              <Area type="monotone" dataKey="humidity" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            </AreaChart>
          </ResponsiveContainer>

          <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Temperature and Humidity Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={preparePieChartData()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {preparePieChartData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default ChartDisplayPage;
