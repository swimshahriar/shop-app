import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Products from './Products/Pages/Products';
import ManageProduct from './Products/Pages/ManageProduct';
import Auth from './Users/Pages/Auth';
import Cart from './Users/Pages/Cart';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>
        <Route path="/manage" exact>
          <ManageProduct />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
