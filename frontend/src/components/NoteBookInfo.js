import React from 'react';
import './NoteBookInfo.css';
import { useNavigate } from 'react-router-dom';

const NoteBookInfo = () => {
    const navigate = useNavigate();
  return (
    <div className="Digital NoteBook-info">
      <div className="info-container">
        <div className="header-section">
          <h1>Welcome to Digital NoteBook</h1>
          <p className="tagline">Your Personal Digital Note Management System</p>
        </div>
        
        <div className="description-section">
          <p>
            Digital NoteBook is designed to help users create,
            manage, and organize their personal notes in a seamless and user-friendly
            manner. Built using modern web technologies, Digital NoteBook offers a smooth
            and efficient experience for users to keep track of their thoughts,
            ideas, and important information.
          </p>
        </div>

        <div className="features-section">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-lock"></i>
              <h3>Secure Authentication</h3>
              <p>user authentication and authorization</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-edit"></i>
              <h3>Note Management</h3>
              <p>Create, edit, and delete your personal notes with ease</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-user"></i>
              <h3>User-Friendly Interface</h3>
              <p>Intuitive and responsive design for the best user experience</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-cloud"></i>
              <h3>Cloud Storage</h3>
              <p>Access your notes from anywhere, anytime</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button className="get-started-btn" onClick={()=>navigate('/signup')}>Get Started Free</button>
        </div>
      </div>
    </div>
  );
};

export default NoteBookInfo;
