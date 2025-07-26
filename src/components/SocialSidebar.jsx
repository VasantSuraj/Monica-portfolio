// src/components/SocialSidebar.jsx
import React from 'react';
import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaPhone,
} from 'react-icons/fa';
import './SocialSidebar.css';

export default function SocialSidebar({ onPhoneClick }) {
  return (
    <div className="social-sidebar">
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
    