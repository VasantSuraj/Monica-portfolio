import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaPhone,
} from 'react-icons/fa';
import './SocialSidebar.css';

export default function SocialSidebar({ onPhoneClick, zoomLevel, showContact }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (showContact || zoomLevel >= 4.5) {
      setVisible(false);
    } else if (isMobile) {
      setVisible(zoomLevel < 2.5); // Only show in MONIKA section
    } else {
      setVisible(true); // Always visible on desktop unless ContactPage or Projects
    }
  }, [zoomLevel, showContact]);

  return (
    <div className={`social-sidebar ${visible ? 'slide-in' : 'slide-out'}`}>
      <div className="sidebar-line" />
      <div className="social-icons">
        <a href="#"><FaLinkedin /></a>
        <a href="#"><FaGithub /></a>
        <a href="#"><FaInstagram /></a>
        <a onClick={onPhoneClick}><FaPhone /></a>
      </div>
    </div>
  );
}
