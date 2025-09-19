import React, { useState } from 'react'
import {Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        navigate('/login');
        setIsMenuOpen(false);
    }

    const closeMenu = () => {
        setIsMenuOpen(false);
    }
    
    return (
        <nav className="main-nav">
            <div className="nav-container">
                <Link to="/" className="nav-brand" onClick={closeMenu}>
                    <i className="fas fa-book-open brand-icon"></i>
                    <span className="brand-text">Digital NoteBook</span>
                </Link>
                
                <button 
                    className="menu-toggle" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {!localStorage.getItem('token') ? (
                        <div className="nav-buttons">
                            <Link 
                                to="/login" 
                                className="nav-link primary" 
                                onClick={closeMenu}
                                aria-current={location.pathname === '/login' ? 'page' : undefined}
                            >
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Login</span>
                            </Link>
                            <Link 
                                to="/signup" 
                                className="nav-link secondary" 
                                onClick={closeMenu}
                                aria-current={location.pathname === '/signup' ? 'page' : undefined}
                            >
                                <i className="fas fa-user-plus"></i>
                                <span>Sign Up</span>
                            </Link>
                        </div>
                    ) : (
                        <div className="nav-buttons">
                            <Link 
                                to="/user/notes" 
                                className={`nav-link primary ${location.pathname === '/user' ? 'active' : ''}`}
                                onClick={closeMenu}
                                aria-current={location.pathname === '/user' ? 'page' : undefined}
                            >
                                <i className="fas fa-home"></i>
                                <span>My Notes</span>
                            </Link>
                            <Link 
                                to="/user" 
                                className={`nav-link primary ${location.pathname === '/user' ? 'active' : ''}`}
                                onClick={closeMenu}
                                aria-current={location.pathname === '/user' ? 'page' : undefined}
                            >
                                <i class="fas fa-sticky-note"></i>
                                <span>Add Note</span>
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="nav-link secondary"
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
