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

  // Handle scroll transition to About
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

  // Escape key closes contact page
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowContact(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ✅ Lock scroll when contact page is open
  useEffect(() => {
    const html = document.querySelector('html');
    const body = document.body;

    if (showContact) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.width = '100vw';
      body.style.height = '100vh';
      body.style.touchAction = 'none';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
      body.style.touchAction = '';
    }

    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.position = '';
      body.style.width = '';
      body.style.height = '';
      body.style.touchAction = '';
    };
  }, [showContact]);

  return (
    <>
      {/* Background Elements */}
      <StarryBackground />
      <Moon zoomLevel={zoomLevel} />

      {/* Sidebar always visible */}
      <SocialSidebar onPhoneClick={() => setShowContact(true)} />

      {/* Main Content */}
      <div className="home">
        <AnimatedName
  zoomLevel={zoomLevel}
  setZoomLevel={setZoomLevel}
  isScrollLocked={showContact}
/>

        {/* Scroll Down Arrow */}
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

        {/* About Section */}
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

            {/* Signature */}
            <div className={`monika-signature ${hasScrolledDown ? 'fade-in' : ''}`}>
              ~Monika R Prasath
            </div>
          </div>
        </div>
      </div>

      {/* Contact Page Overlay */}
      {showContact && <ContactPage onClose={() => setShowContact(false)} />}
    </>
  );
}
