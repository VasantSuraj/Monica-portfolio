import React from 'react';
import './VerticalNav.css';

export default function VerticalNav() {
  return (
    <div className="vertical-nav">
      <div className="nav-line" />
      <div className="nav-links">
       <a href="#about">About</a>
<a href="#skills">Skills</a>
<a href="#projects">Projects</a>
<a href="#contact">Contact</a>

      </div>
    </div>
  );
}
