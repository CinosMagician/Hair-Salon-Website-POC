import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import NavTabs from './components/NavTabs';

const Header = ({ currentPage }) => {
  return (
    <header className="d-flex justify-content-between align-items-center topGap text-white">
      <NavTabs currentPage={currentPage} />
    </header>
  );
};

export default Header;
