import React, { useEffect, useRef, useState } from 'react';
import './Moon.css';
import moonImage from '../assets/moon.png';

export default function Moon({ zoomLevel }) {
  const moonRef = useRef(null);
  const containerRef = useRef(null);
  const [spinAngle, setSpinAngle] = useState(0);

  // Spin animation using requestAnimationFrame
  useEffect(() => {
    let animationFrame;
    let lastTime = performance.now();

    const spin = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      // Increase spin angle slowly (adjust 0.01 for speed)
      setSpinAngle((prev) => (prev + delta * 0.01) % 360);

      animationFrame = requestAnimationFrame(spin);
    };

    animationFrame = requestAnimationFrame(spin);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Combine scroll transform with spinAngle
  useEffect(() => {
    if (!moonRef.current || !containerRef.current) return;

    const scale = 1 + (zoomLevel - 1) * 0.3;
    const scrollRotation = (zoomLevel - 1) * 20;
    const totalRotation = scrollRotation + spinAngle;

    const top = -30 + (zoomLevel - 1) * ((20 + 30) / 2);
    const left = 60 + (zoomLevel - 1) * 5;

    requestAnimationFrame(() => {
      containerRef.current.style.top = `${top}%`;
      containerRef.current.style.left = `${left}%`;
      moonRef.current.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${totalRotation}deg)`;
    });
  }, [zoomLevel, spinAngle]);

  return (
    <div className="moon-container" ref={containerRef}>
      <img
        ref={moonRef}
        src={moonImage}
        alt="Moon"
        className="moon"
      />
    </div>
  );
}
