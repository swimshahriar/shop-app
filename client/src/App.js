import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AllProducts from './products/pages/AllProducts';
import Cart from './orders/pages/Cart';
import Auth from './users/pages/Auth';
import Dashboard from './users/pages/Dashboard';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <AllProducts />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/user/dashboard" exact>
          <Dashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
