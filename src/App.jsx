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
      <SocialSidebar onPhoneClick={() => setShowContact(true)} />

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
          <h2 className="about-heading">Meet Monica</h2>

          <div className={`about-square ${hasScrolledDown ? 'reveal' : ''}`}>
            <p className="line" style={{ animationDelay: '0.2s' }}>
              Hi, I’m Monica — CEO of{' '}
              <span className="highlight">
                <a
                  href="https://surakshaamadhavan.github.io/i-lish/demo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  i-lish Edu School
                </a>
              </span>{' '}
              and{' '}
              <span className="highlight">
                <a
                  href="https://mainproject-red.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wolfpack Startup
                </a>
              </span>.
            </p>
            <p className="line" style={{ animationDelay: '1.2s' }}>
              I’ve always believed that education and innovation go hand in hand.
            </p>
            <p className="line" style={{ animationDelay: '2.2s' }}>
              That’s why I started i-lish Edu — to empower students with skills that truly matter.
            </p>
            <p className="line" style={{ animationDelay: '3.2s' }}>
              At Wolfpack, we build bold, digital-first solutions for curious minds.
            </p>
            <p className="line" style={{ animationDelay: '4.2s' }}>
              Welcome to my world — and thank you for being part of the journey.
            </p>

            <div className={`monika-signature ${hasScrolledDown ? 'fade-in' : ''}`}>
              ~Monika R Prasath
            </div>
          </div>
        </div>
      </div>

      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
    </>
  );
}
