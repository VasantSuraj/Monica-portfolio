// src/components/Timeline.jsx
import React, { useEffect, useRef, useState } from 'react';
import StarryBackground from './StarryBackground';
import './Timeline.css';
import {
  FaGraduationCap,
  FaLaptopCode,
  FaRocket,
  FaCode,
} from 'react-icons/fa';

export default function Timeline({ onClose }) {
  const lineRef = useRef(null);
  const entryRefs = useRef([]);
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });

  const timelineData = [
    {
      year: '2017 – 2018',
      title: 'SSLC — 89%',
      icon: <FaGraduationCap />,
      quote: '“In the pages of schoolbooks, I found the courage to dream silently.”',
    },
    {
      year: '2019 – 2020',
      title: 'HSC — 81%',
      icon: <FaGraduationCap />,
      quote: '“I chased numbers, but found meaning in the margins.”',
    },
    {
      year: '2020 – 2021',
      title: 'B.Tech IT — 7.9 CGPA',
      icon: <FaGraduationCap />,
      quote: '“Engineering sharpened how I think — and showed me how to break things first, then fix them better.”',
    },
    {
      year: '2020',
      title: 'First Code',
      icon: <FaCode />,
      quote: '“The moment HTML made a button — and I realized this is my canvas.”',
    },
    {
      year: '2021 – 2023',
      title: 'Startup / Projects',
      icon: <FaLaptopCode />,
      quote: '“I didn’t wait for a job. I built what I believed in.”',
    },
    {
      year: '2024 – Now',
      title: 'Portfolio + Future',
      icon: <FaRocket />,
      quote: '“Still building. Still dreaming. Still learning.”',
    },
  ];

  useEffect(() => {
    const first = entryRefs.current[0];
    const last = entryRefs.current[entryRefs.current.length - 1];
    if (first && last) {
      const top = first.offsetTop + first.offsetHeight / 2;
      const bottom = last.offsetTop + last.offsetHeight / 2 + 30;
      setLineStyle({ top, height: bottom - top });
    }
  }, []);

  return (
    <div className="timeline-container">
      <StarryBackground />

      <div className="timeline-header">
        <button className="close-btn" onClick={onClose}>×</button>
      </div>

      {/* ⛔️ Removed this — was causing the word "TIMELINE" to appear unnecessarily */}
      {/* <div className="timeline-label">TIMELINE</div> */}

      <div
        className="timeline-line"
        ref={lineRef}
        style={{
          top: `${lineStyle.top}px`,
          height: `${lineStyle.height}px`,
        }}
      />

      <div className="timeline-entries">
        {timelineData.map((item, index) => (
          <div
            className={`timeline-entry ${index % 2 === 0 ? 'left' : 'right'}`}
            key={index}
            ref={(el) => (entryRefs.current[index] = el)}
            style={{ animationDelay: `${index * 0.4}s` }}
          >
            <div className="timeline-icon">{item.icon}</div>
            <div className="timeline-content">
              <h4>{item.year} — {item.title}</h4>
              <p>{item.quote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
