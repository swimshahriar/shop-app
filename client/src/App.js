import React, { useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import MainNavigation from './shared/Header/MainNavigation';
import AllProducts from './products/pages/AllProducts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ShopContext } from './shared/context/ShopContext';
import { useAuth } from './shared/hooks/auth-hook';
import './App.css';

// lazy import components
const Cart = React.lazy(() => import('./orders/pages/Cart'));
const NewProduct = React.lazy(() => import('./products/pages/NewProduct'));
const Dashboard = React.lazy(() => import('./users/pages/Dashboard'));
const UpdateProduct = React.lazy(() =>
  import('./products/pages/UpdateProduct')
);
const DeleteProduct = React.lazy(() =>
  import('./products/pages/DeleteProduct')
);
const Auth = React.lazy(() => import('./users/pages/Auth'));

const App = () => {
  const { token, isToken, userId, login, logout } = useAuth();
  const [cartData, setCartData] = useState({ items: [], totalPrice: 0 });
  const [totalPrice, setTotalPrice] = useState(0);

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
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/success" exact>
          <Cart />
        </Route>
        <Route path="/cancel" exact>
          <Cart />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <ShopContext.Provider
      value={{
        isLogedIn: !!token,
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
        <main>
          <Suspense
            fallback={
              <div className="center">
                <CircularProgress />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </ShopContext.Provider>
  );
};

export default App;
