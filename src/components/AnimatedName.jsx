import React, { useEffect, useRef, useState } from 'react';
import './AnimatedName.css';

export default function AnimatedName({ zoomLevel, setZoomLevel, isScrollLocked }) {
  const [isFilled, setIsFilled] = useState(false);
  const nameRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsFilled(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isFilled || isScrollLocked) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const direction = e.deltaY < 0 ? 1 : -1;
      let newZoom = zoomLevel + direction * 0.1;
      newZoom = Math.min(Math.max(newZoom, 1), 5);
      setZoomLevel(newZoom);

      if (nameRef.current) {
        nameRef.current.style.transform = `translate(-50%, -50%) scale(${newZoom})`;
        nameRef.current.style.opacity = newZoom >= 2.5 ? 0 : 1;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoomLevel, isFilled, setZoomLevel, isScrollLocked]);

  return (
    <div className="animated-name">
      <div className="name-wrapper">
        {zoomLevel < 2.5 && (
          <div className="vasantsuraj-container" ref={nameRef}>
            <svg className="vasantsuraj-svg" viewBox="0 0 1500 300">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`vasantsuraj-text ${isFilled ? 'filled' : ''}`}
              >
                VASANT SURAJ
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
