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
import Auth from './users/pages/Auth';
import Dashboard from './users/pages/Dashboard';
import { AuthContext } from './shared/context/auth-context';
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
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
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
    </AuthContext.Provider>
  );
};

export default App;
