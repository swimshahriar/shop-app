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

  // Cart functionality

  // add to cart
  const addToCart = (product) => {
    const updatedCart = [...cartData.items];
    let totalPrice = 0;

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item._id === product._id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({
        ...product,
        quantity: 1,
        total: product.price,
      });
    } else {
      const updatedItem = updatedCart[updatedItemIndex];

      updatedItem.quantity++;
      updatedItem.total = updatedItem.quantity * updatedItem.price;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    updatedCart.forEach((item) => +(totalPrice += item.total));

    setCartData({ items: updatedCart, totalPrice: totalPrice });
  };

  // remove from cart
  const removeFromCart = (productId) => {
    const updatedCart = [...cartData.items];
    let totalPrice = 0;

    const updatedItemIndex = updatedCart.findIndex(
      (item) => item._id === productId
    );

    const updatedItem = updatedCart[updatedItemIndex];
    updatedItem.quantity--;

    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedItem.total = updatedItem.quantity * updatedItem.price;
      updatedCart[updatedItemIndex] = updatedItem;
    }

    updatedCart.forEach((item) => +(totalPrice += item.total));

    setCartData({ items: updatedCart, totalPrice: totalPrice });
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
        addToCart: addToCart,
        removeFromCart: removeFromCart,
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
