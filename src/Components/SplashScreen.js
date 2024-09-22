import React, { useEffect, useState } from 'react';
import './SplashScreen.css'; // Add styles here if needed

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Simulate loading time (e.g., 2 seconds)
    const timer = setTimeout(() => {
      onComplete(); // Call the onComplete function after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup
  }, [onComplete]);

  return (
    <div className="splash-screen">
      <h1>Track Fitness</h1>
    </div>
  );
};

export default SplashScreen;
