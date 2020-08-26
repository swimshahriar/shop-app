import React, { useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';

import { ShopContext } from '../../shared/context/ShopContext';
import Button from '../../shared/components/FormElements/Button';
import './Cart.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const Cart = () => {
  const shopCart = useContext(ShopContext);

  // stripe makePayment
  const makePayment = async (event) => {
    try {
      const response = await fetch(
        'https://shop-app01.herokuapp.com/api/order/payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + shopCart.token,
          },
          body: JSON.stringify({
            totalPrice: shopCart.cart.totalPrice,
            products: shopCart.cart.items,
          }),
        }
      );
      const { session_id: sessionId } = await response.json();

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      console.log(error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="center cart">
      {shopCart.cart.items.length === 0 && <h1>No Products Found!</h1>}
      {shopCart.cart.items.length !== 0 && (
        <React.Fragment>
          <table style={{ marginRight: '10px' }}>
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
                    <td>
                      <Button
                        onClick={() => shopCart.removeFromCart(product._id)}
                      >
                        -
                      </Button>{' '}
                      {product.quantity}{' '}
                      <Button onClick={() => shopCart.addToCart(product)}>
                        +
                      </Button>
                    </td>
                    <td>${product.total}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2}>Total:</td>
                <td>${shopCart.cart.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
          <div>
            <Button role="link" onClick={makePayment}>
              Checkout
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
