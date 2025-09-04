import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-brand">
            <i className="fas fa-book-open footer-icon"></i>
            <span>iNoteBook</span>
          </div>
          <p className="footer-description">
            Your secure digital NoteBook for organizing thoughts and ideas.
          </p>
        </div>
        

        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} iNoteBook. All rights reserved.
          </div>
          <div className="developer">
            Designed & Developed by <span className="highlight">The Goyal's</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
