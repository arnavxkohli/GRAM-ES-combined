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

// const binId = localStorage.getItem('binId'); // uncomment this once you are done with defining everything
// const uId = localStorage.getItem('uId');

const Bin = ({uId, binId}) => {
  const localStorageKey = `fillLevel-${binId}`;
  const defaultValue = getFromLocalStorage(localStorageKey, 0);
  const [fillPercentage, setFillPercentage] = useState(defaultValue);

  useEffect(() => {
    const fetchFillPercentage = async () => {
      try {
        const data = await fetchSensorData(binId, "ToF", uId, defaultValue);
        setFillPercentage(data['data']);
        setToLocalStorage(localStorageKey, data['data']);
      } catch (error) {
        console.error("Error fetching fill percentage:", error);
      }
    };

    // Initial fetch
    fetchFillPercentage();

    // Set up polling
    const interval = setInterval(() => {
      fetchFillPercentage();
    }, 500); // Poll every 10 seconds

    // Clean up
    return () => clearInterval(interval);
  }, [binId, uId, defaultValue, localStorageKey]);

  // Calculate the height of the fill polygon based on the fill percentage
  const topY = 100 - fillPercentage;
  const topX1 = -(0.1 * fillPercentage) + 20  ;
  const topX2 = 100 - topX1 ;

  let gradientId;

    // Determine which gradient to use based on fill percentage
    if (fillPercentage < 60) {
    gradientId = "blueGradient";
    } else if (fillPercentage < 80) {
    gradientId = "yellowGradient";
    } else {
    gradientId = "redGradient";
    }

  return (
    <div className='text-black p-16'>
      <p className='text-center p-2 pb-4 text-3xl'>Fill Level</p>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-64 h-[17rem]">
          <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8360c3" />
              <stop offset="100%" stopColor="#2ebf91" />
          </linearGradient>
          <linearGradient id="yellowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f12711" />
              <stop offset="100%" stopColor="#f5af19" />
          </linearGradient>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c31432" />
              <stop offset="100%" stopColor="#240b36" />
          </linearGradient>
          </defs>
        {/* Trapezium shape */}
        <polygon points="10,0 90,0 80,100 20,100" fill="#e0e0e0" />
        {fillPercentage >= 0 && (
        <>
        <polygon points={`${topX1},${topY} ${topX2},${topY} 80,100 20,100`} fill={`url(#${gradientId})`} />
        {/* Percentage label */}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" style={{ fill: '#000000' }} className="font-bold">{fillPercentage}%</text>
      </>
      )}
      </svg>
    </div>
  );
};

export default Bin;
