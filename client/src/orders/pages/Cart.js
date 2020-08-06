import React, { useContext } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { loadStripe } from '@stripe/stripe-js';

import { ShopContext } from '../../shared/context/ShopContext';

import './Cart.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const Cart = () => {
  const shopCart = useContext(ShopContext);

  const makePayment = async (event) => {
    try {
      const response = await fetch('http://localhost:8000/api/order/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + shopCart.token,
        },
        body: JSON.stringify({
          totalPrice: shopCart.cart.totalPrice,
          quantity: shopCart.cart.items.length,
          products: shopCart.cart.items,
        }),
      });
      const { session_id: sessionId } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="center cart">
      {shopCart.cart.items.length === 0 && <h1>No Products Found!</h1>}
      {shopCart.cart.items.length !== 0 && (
        <React.Fragment>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {shopCart.cart.items.map((product, i) => {
                return (
                  <tr key={i}>
                    <td>{product.name}</td>
                    <td>x {product.quantity}</td>
                    <td>${product.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">Total:</td>
                <td>${shopCart.cart.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
          <div>
            <button role="link" onClick={makePayment}>
              Checkout
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
