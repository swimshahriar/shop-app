import React, { useContext } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';

import { ShopContext } from '../../shared/context/ShopContext';

import './Cart.css';

const Cart = () => {
  const shopCart = useContext(ShopContext);

  const makePayment = async (token) => {
    let response;
    try {
      response = await fetch('http://localhost:8000/api/order/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + shopCart.token,
        },
        body: JSON.stringify({
          token,
          product: {
            totalPrice: shopCart.cart.totalPrice,
          },
        }),
      });
      return JSON.parse(response);
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
            <ReactStripeCheckout
              stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
              name={`Pay ${shopCart.cart.totalPrice}`}
              token={makePayment}
              amount={shopCart.cart.totalPrice * 100}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Cart;
