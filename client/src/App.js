import React from 'react';
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
import './App.css';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <AllProducts />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <Route path="/add" exact>
            <NewProduct />
          </Route>
          <Route path="/update/:pid" exact>
            <UpdateProduct />
          </Route>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
