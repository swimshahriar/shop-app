import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from './Navigation';

import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div>
        <h1 className="header__heading">
          <Link to="/" className="header__heading-link"> Shop App</Link>
        </h1>
      </div>
      <div>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
