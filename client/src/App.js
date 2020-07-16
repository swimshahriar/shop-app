import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MainNavigation from './shared/Header/MainNavigation';
import AllProducts from './products/pages/AllProducts';
import Cart from './orders/pages/Cart';
import NewProduct from './products/pages/NewProduct';
import UpdateProduct from './products/pages/UpdateProduct';
import DeleteProduct from './products/pages/DeleteProduct';
import Auth from './users/pages/Auth';
import Dashboard from './users/pages/Dashboard';
import { ShopContext } from './shared/context/ShopContext';
import './App.css';

const App = () => {
  const [isToken, setIsToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((userId, token) => {
    setIsToken(true);
    setUserId(userId);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setIsToken(false);
    setUserId(null);
    setToken(null);
  }, []);

  let routes;

  if (!isToken) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <AllProducts />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <AllProducts />
        </Route>
        <Route path="/add" exact>
          <NewProduct />
        </Route>
        <Route path="/update/:pid" exact>
          <UpdateProduct />
        </Route>
        <Route path="/delete/:pid" exact>
          <DeleteProduct />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <ShopContext.Provider
      value={{
        isLogedIn: !!isToken,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </ShopContext.Provider>
  );
};

export default App;
