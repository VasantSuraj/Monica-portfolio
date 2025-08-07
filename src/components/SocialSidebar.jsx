import React, { useEffect, useState } from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaPhone,
} from 'react-icons/fa';
import './SocialSidebar.css';

export default function SocialSidebar({ onPhoneClick, zoomLevel, showContact, showTimeline }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    if (showContact || zoomLevel >= 4.5) {
      setVisible(false); // Always hide when contact or fully zoomed
    } else if (showTimeline) {
      setVisible(true); // Show on timeline (both desktop & mobile)
    } else if (isMobile) {
      // On mobile: only show in Home before zoomLevel reaches About
      setVisible(zoomLevel < 2.5);
    } else {
      // On desktop: always show on Home and About
      setVisible(true);
    }
  }, [zoomLevel, showContact, showTimeline]);

  return (
    <div className={`social-sidebar ${visible ? 'slide-in' : 'slide-out'}`}>
      <div className="sidebar-line" />
      <div className="social-icons">
        <a href="https://linkedin.com/in/vasant-suraj-877371253"><FaLinkedin /></a>
        <a href="https://github.com/VasantSuraj/"><FaGithub /></a>
        <a href="https://www.instagram.com/vasant_loves_u/"><FaInstagram /></a>
        <a onClick={onPhoneClick}><FaPhone /></a>
      </div>
    </div>
  );
}
