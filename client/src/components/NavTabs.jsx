import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSalonContext } from "../utils/GlobalState";
import { motion, AnimatePresence } from "framer-motion";
import Auth from "../utils/auth";
import "./NavTabs.css";

const NavTabs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart drawer
  const { state } = useSalonContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    Auth.logout();
    navigate("/home");
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleCartToggle = () => {
    setIsCartOpen((prevState) => !prevState); // Toggle cart drawer state
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
      <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
        <ul className="nav-list">
          <li className="nav-item">
            <Link
              to="/home"
              className={isActive("/home") ? "nav-link active" : "nav-link"}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/booking"
              className={isActive("/booking") ? "nav-link active" : "nav-link"}
            >
              Book Now
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shop"
              className={isActive("/shop") ? "nav-link active" : "nav-link"}
            >
              Shop Here
            </Link>
          </li>
          {state.isAuthenticated ? (
            <>
              <li>
                <button className="nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={
                    isActive("/login") ? "nav-link active" : "nav-link"
                  }
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className={
                    isActive("/signup") ? "nav-link active" : "nav-link"
                  }
                >
                  Sign Up
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <button className="nav-link" onClick={handleCartToggle}>
              Cart
            </button>
          </li>
        </ul>
      </nav>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-cart" onClick={handleCartToggle}>
                &times;
              </button>
            </div>
            <div className="cart-content">
              <p>Your cart is empty!</p>
              {/* Dynamically render cart items here */}
            </div>
            <div className="cart-footer">
              <button
                className="view-cart-btn"
                onClick={() => {
                  handleCartToggle(); // Close cart drawer
                  navigate("/cart"); // Navigate to cart page
                }}
              >
                View Cart
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="dropdown-menu"
            variants={navVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="dropdown-nav">
              <li className="nav-item">
                <Link
                  to="/home"
                  className={isActive("/home") ? "nav-link active" : "nav-link"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/booking"
                  className={
                    isActive("/booking") ? "nav-link active" : "nav-link"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/shop"
                  className={isActive("/shop") ? "nav-link active" : "nav-link"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shop Here
                </Link>
              </li>
              {state.isAuthenticated ? (
                <li>
                  <button
                    className="nav-link"
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className={
                        isActive("/login") ? "nav-link active" : "nav-link"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className={
                        isActive("/signup") ? "nav-link active" : "nav-link"
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link
                  to="/cart"
                  className={isActive("/cart") ? "nav-link active" : "nav-link"}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavTabs;
