import React, { useEffect, useRef, useState } from 'react';
import './AnimatedName.css';

export default function AnimatedName({ zoomLevel, setZoomLevel, isScrollLocked }) {
  const [isFilled, setIsFilled] = useState(false);
  const monikaRef = useRef(null);

  // Animate stroke + fill after load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFilled(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Scroll-controlled zoom (only when not locked)
  useEffect(() => {
    const handleWheel = (e) => {
      if (!isFilled || isScrollLocked) return;
      e.preventDefault();
      const direction = e.deltaY < 0 ? 1 : -1;
      let newZoom = zoomLevel + direction * 0.1;
      newZoom = Math.min(Math.max(newZoom, 1), 5);
      setZoomLevel(newZoom);

      if (monikaRef.current) {
        monikaRef.current.style.transform = `translate(-50%, -50%) scale(${newZoom})`;
        monikaRef.current.style.opacity = newZoom >= 2.5 ? 0 : 1;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [zoomLevel, isFilled, setZoomLevel, isScrollLocked]);

  return (
    <div className="animated-name">
      <div className="name-wrapper">
        {zoomLevel < 2.5 && (
          <div className="monika-container" ref={monikaRef}>
            <svg className="monika-svg" viewBox="0 0 1500 300">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className={`monika-text ${isFilled ? 'filled' : ''}`}
              >
                MONICA
              </text>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
