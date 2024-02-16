import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../requests';

const getFromLocalStorage = (key, defaultValue) => {
  if(typeof window === "undefined"){
    return defaultValue;
  }
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};



const CircularGauge = ({ binId, uId, sensorType}) => {

  let title, max, units;

  switch (sensorType) {
    case 'air_quality':
      title = 'Air Quality';
      max = 1500; // Max temperature value
      units = ' CO2 ppm';
      break;
    case 'magnetic':
      title = 'Magnetometer';
      max = 100; // Max humidity value
      units = ' µT';
      break;
    // Add more cases for other sensor types if needed
    default:
      title = 'Default Title';
      max = 100;
      units = '';
      break;
  }



  const localStorageKey = `gaugeLevel-${title}`;
  const defaultValue = getFromLocalStorage(localStorageKey, 0);
  const [gaugeValue, setGaugePercentage] = useState(defaultValue);

  useEffect(() => {
    const fetchGaugePercentage = async () => {
      try {
        const data = await fetchSensorData(binId, sensorType, uId, defaultValue);
        let fetchedData = data['data'];
        if(sensorType === 'magnetic'){
          fetchedData = parseFloat(fetchedData)/1000000;
          fetchedData = fetchedData.toFixed(2);
        }
        setGaugePercentage(fetchedData);
        setToLocalStorage(localStorageKey, fetchedData);
      } catch (error) {
        console.error("Error fetching gauge percentage:", error);
      }
    };

    // Initial fetch
    fetchGaugePercentage();

    // Set up polling
    const interval = setInterval(() => {
      fetchGaugePercentage();
    }, 500); // Poll every 10 seconds

    // Clean up
    return () => clearInterval(interval);
  }, [binId, sensorType, uId, defaultValue, localStorageKey]);

  // Calculate percentage based on value and max
  const percentage = (gaugeValue / max) * 100;
  // Calculate angle based on percentage
  const angle = (percentage / 100) * 360; // 360 degrees for 100%

  const startAngle = -90;
  const endAngle = startAngle + angle;
  const x1 = 100 + 90 * Math.cos((startAngle * Math.PI) / 180);
  const y1 = 100 + 90 * Math.sin((startAngle * Math.PI) / 180);
  const x2 = 100 + 90 * Math.cos((endAngle * Math.PI) / 180);
  const y2 = 100 + 90 * Math.sin((endAngle * Math.PI) / 180);

  // Generate gradient for progress arc
  const gradientId = `gradient-${Math.random().toString(36).substring(7)}`;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      {/* Background circle */}
      <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" strokeWidth="20" />
      {/* Progress arc */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={'#8E2DE2'} />
          <stop offset="100%" stopColor={'#4A00E0'} />
        </linearGradient>
      </defs>
      <path
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="20"
        strokeLinecap="round"
        d={`M ${x1} ${y1} A 90 90 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2}`}
      />
      {/* Title */}
      <text x="100" y="80" textAnchor="middle" fontSize="16" fill="#00000">
        {title}
      </text>
      {/* Percentage */}
      <text x="100" y="120" textAnchor="middle" fontSize="20" fill="#00000">
        {gaugeValue}{units}
      </text>
    </svg>
  );
};

export default CircularGauge;
