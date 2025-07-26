import React, { useEffect, useState } from 'react';
import './home.css';

const Home = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      <div className="center-text">
        <span className="monica-text">MONICA</span>
        <span className="ceo-text">CEO</span>
      </div>

      {animationComplete && (
        <div className="vertical-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </div>
  );
};

export default Home;
