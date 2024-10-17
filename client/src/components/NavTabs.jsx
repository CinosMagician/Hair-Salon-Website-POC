import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSalonContext } from "../utils/GlobalState";
import { motion, AnimatePresence } from 'framer-motion';
import Auth from "../utils/auth"; // Make sure you import your auth utility
import './NavTabs.css';

const NavTabs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state } = useSalonContext();
  const location = useLocation();
  const navigate = useNavigate(); // Import the navigate function from react-router-dom
  
  const handleLogout = () => {
    Auth.logout();
    navigate('/login'); // Navigate to login after logout
    alert("broken");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const isMobile = window.innerWidth <= 840;

  const navVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: isMobile ? 220 : 260,
        damping: 20,
        duration: isMobile ? 0.2 : 0.3,
        ease: "easeOut",
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: isMobile ? 0.15 : 0.2,
        ease: "easeIn",
      },
    },
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <h1 className="logo">Hair Salon</h1>
      <button className="menu-button" onClick={handleMenuToggle}>
        &#9776;
      </button>
      <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/home"
              className={isActive('/home') ? 'nav-link active' : 'nav-link'}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/booking"
              className={isActive('/booking') ? 'nav-link active' : 'nav-link'}
            >
              Book Now
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shop"
              className={isActive('/shop') ? 'nav-link active' : 'nav-link'}
            >
              Shop Here
            </Link>
          </li>
          {state.isAuthenticated ? (
            <>
              <li>
                <button
                  className="nav-link"
                  onClick={handleLogout} // Call the logout handler here
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={isActive('/login') ? 'nav-link active' : 'nav-link'}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={isActive('/signup') ? 'nav-link active' : 'nav-link'}
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="dropdown-menu"
            variants={navVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Dropdown menu content */}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavTabs;