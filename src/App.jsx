import React, { useState, useEffect, useRef } from 'react';
import StarryBackground from './components/StarryBackground';
import AnimatedName from './components/AnimatedName';
import Moon from './components/Moon';
import SocialSidebar from './components/SocialSidebar';
import ContactPage from './components/ContactPage';
import './App.css';

export default function App() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const prevZoom = useRef(1);

  // ✅ Desktop + mobile scroll handling
  useEffect(() => {
    const handleWheel = (event) => {
      if (showContact) return;
      setZoomLevel((prev) => {
        const newZoom = prev + event.deltaY * 0.0015;
        return Math.min(Math.max(newZoom, 1), 6);
      });
    };

    let lastTouchY = null;

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (showContact || lastTouchY === null) return;

      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY - currentY;

      setZoomLevel((prev) => {
        const newZoom = prev + deltaY * 0.015;
        return Math.min(Math.max(newZoom, 1), 6);
      });

      lastTouchY = currentY;
    };

    const handleTouchEnd = () => {
      lastTouchY = null;
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [showContact]);

  // ✅ Trigger About section reveal
  useEffect(() => {
    if (
      zoomLevel >= 2.5 &&
      !hasScrolledDown &&
      zoomLevel > prevZoom.current
    ) {
      setHasScrolledDown(true);
    }
    prevZoom.current = zoomLevel;
  }, [zoomLevel]);

  // ✅ Escape key to close ContactPage
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowContact(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ✅ Scroll lock for ContactPage
  useEffect(() => {
    const body = document.body;
    if (showContact) {
      body.classList.add('scroll-lock');
    } else {
      body.classList.remove('scroll-lock');
    }
    return () => body.classList.remove('scroll-lock');
  }, [showContact]);

  return (
    <>
      <StarryBackground />
      <Moon zoomLevel={zoomLevel} />

      {/* ✅ SocialSidebar now receives zoomLevel and showContact */}
      <SocialSidebar
        onPhoneClick={() => setShowContact(true)}
        zoomLevel={zoomLevel}
        showContact={showContact}
      />

      <div className="home">
        <AnimatedName
          zoomLevel={zoomLevel}
          setZoomLevel={setZoomLevel}
          isScrollLocked={showContact}
        />

        {zoomLevel < 2.5 && (
          <div className="scroll-down-arrow">
            <svg
              width="26"
              height="40"
              viewBox="0 0 24 30"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="4" x2="12" y2="22" />
              <polyline points="5 15 12 22 19 15" />
            </svg>
          </div>
        )}

        <div
          className="about-section"
          style={{
            opacity: zoomLevel >= 2.5 ? 1 : 0,
            transform: `scale(${Math.min(zoomLevel / 2.5, 1)})`,
            pointerEvents: zoomLevel >= 2.5 ? 'auto' : 'none',
          }}
        >
          <h2 className="about-heading">Meet Vasant Suraj</h2>

          <div className={`about-square ${hasScrolledDown ? 'reveal' : ''}`}>
            <p className="line" style={{ animationDelay: '0.2s' }}>
              Dear World,
            </p>
            <p className="line" style={{ animationDelay: '1.2s' }}>
              I'm <span className="highlight">Vasant Suraj S V</span>, a software developer who sees code not just as logic, but as poetry written in syntax.
            </p>
            <p className="line" style={{ animationDelay: '2.2s' }}>
              I fell in love with creation — not with brush and canvas, but with functions and frameworks. Every project I build is a letter to the future, a promise of purpose and elegance.
            </p>
            <p className="line" style={{ animationDelay: '3.2s' }}>
              From stargazing interfaces to grounded backend logic, I chase beauty in balance — speed, precision, clarity.
            </p>
            <p className="line" style={{ animationDelay: '4.2s' }}>
              If you're reading this, thank you. You're now part of this story — and the next chapter is waiting to be written.
            </p>

            <div className={`vasant-signature ${hasScrolledDown ? 'fade-in' : ''}`}>
              ~Vasant Suraj S V
            </div>
          </div>
        </div>
      </div>

      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
    </>
  );
}
