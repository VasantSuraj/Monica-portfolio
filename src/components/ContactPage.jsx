// src/components/ContactPage.jsx
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPage.css';

export default function ContactPage({ onClose }) {
  const [showRocket, setShowRocket] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowRocket(true);
    setSentSuccess(false);

    emailjs
      .sendForm(
        'service_wixkcke',
        'template_v6keyim',
        formRef.current,
        'LUG9w4_7LqMTn6H8z'
      )
      .then(() => {
        // ✅ SQLite backend call
        const formData = new FormData(formRef.current);
        fetch('http://localhost:5000/submit-contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
          })
        });

        formRef.current.reset();
        setSentSuccess(true);
      })
      .catch((error) => {
        console.error('Email send failed:', error);
      })
      .finally(() => {
        setTimeout(() => setShowRocket(false), 3000);
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-box">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="contact-title">Let's Get In Touch</h2>

        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" rows="5" required />

          <div className="button-wrapper">
            <button type="submit">Cast the Message Spell 🪄</button>

            {showRocket && (
              <div className="rocket-launch">
                <div className="rocket">🚀</div>
                <div className="flame"></div>
              </div>
            )}
          </div>
        </form>

        {sentSuccess && (
          <div className="message-sent-text">🎉 Message spell casted successfully!</div>
        )}
      </div>
    </div>
  );
}
