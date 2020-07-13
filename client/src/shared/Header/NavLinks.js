import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import './NavLinks.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {auth.isLogedIn && (
        <li>
          <NavLink to="/add" exact>
            Add Product
          </NavLink>
        </li>
      )}
      {auth.isLogedIn && (
        <li>
          <NavLink to="/update/5f0857fbceca0610a55a2f35">Update</NavLink>
        </li>
      )}
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
    </ul>
  );
};

export default NavLinks;
