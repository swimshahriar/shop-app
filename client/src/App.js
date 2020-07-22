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
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const [totalPrice, setTotalPrice] = useState(0);

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

  // Cart functionality
  const cart = (product) => {
    //setting total price by adding the previous total with new product price
    setTotalPrice(totalPrice + product.totalPrice);

    // If it is the first item
    if (cartData.items.length === 0) {
      setCartData({
        items: [...cartData.items, product],
        totalPrice: totalPrice,
      });
    }

    // If it is not the first item
    if (cartData.items.length > 0) {
      let existingItem = cartData.items.find(
        (item) => product._id === item._id
      );

      // If it is an existing item in the cart
      if (existingItem) {
        // Getting the index of the existing item
        const indexOfExistingProduct = cartData.items.findIndex(
          (item) => product._id === item._id
        );

        // Updating quantity and totalPrice of the existing item
        existingItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.price * (existingItem.quantity + 1),
        };

        // Getting an Array without the existing item
        let restOfTheItem = cartData.items.filter(
          (item) => product._id !== item._id
        );

        // Placing the updated existing item into its right index
        restOfTheItem.splice(indexOfExistingProduct, 0, existingItem);

        setCartData({
          items: restOfTheItem,
          totalPrice: totalPrice,
        });
      } else {
        setCartData({
          items: [...cartData.items, product],
          totalPrice: totalPrice,
        });
      }
    }
  };

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
        cart: cartData,
        cartFunction: cart,
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
