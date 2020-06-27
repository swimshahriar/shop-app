import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

const Navigation = () => {
  return (
    <nav>
      <ul className="navlink">
        <li className="navlink__item">
          <NavLink to="/" exact>
            Products
          </NavLink>
        </li>
        <li className="navlink__item">
          <NavLink to="/manage">Manage</NavLink>
        </li>
        <li className="navlink__item">
          <NavLink to="/auth">Auth</NavLink>
        </li>
        <li className="navlink__item">
          <NavLink to="/cart">Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
