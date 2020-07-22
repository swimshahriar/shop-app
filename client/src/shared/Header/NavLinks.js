import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';
import './NavLinks.css';

const NavLinks = () => {
  const auth = useContext(ShopContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {auth.isLogedIn && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      {!auth.isLogedIn && (
        <li>
          <NavLink to="/auth">Login/Signup</NavLink>
        </li>
      )}
      {auth.isLogedIn && (
        <li>
          <button onClick={auth.logout}>Logout</button>
        </li>
      )}
      <li>
        <NavLink to="/cart">Cart ({auth.cart.items.length})</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
