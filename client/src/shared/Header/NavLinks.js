import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ShopContext } from '../context/ShopContext';
import './NavLinks.css';

const NavLinks = () => {
  const shopContext = useContext(ShopContext);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let items = 0;
    shopContext.cart.items.forEach((item) => {
      items += item.quantity;
    });

    setItemCount(items);
  }, [shopContext.cart]);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Home
        </NavLink>
      </li>
      {shopContext.isLogedIn && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
      {!shopContext.isLogedIn && (
        <li>
          <NavLink to="/shopContext">Login/Signup</NavLink>
        </li>
      )}
      {shopContext.isLogedIn && (
        <li>
          <button onClick={shopContext.logout}>Logout</button>
        </li>
      )}
      <li>
        <NavLink to="/cart">Cart ({itemCount})</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
