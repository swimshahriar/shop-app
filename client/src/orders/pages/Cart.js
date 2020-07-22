import React, { useContext } from 'react';

import { ShopContext } from '../../shared/context/ShopContext';

import './Cart.css';

const Cart = () => {
  const shopCart = useContext(ShopContext);
  return (
    <div className="center cart">
      {shopCart.cart.items.length === 0 && <h1>No Products Found!</h1>}
      {shopCart.cart.items.length !== 0 && (
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
              <td></td>
              <td></td>
              <td>${shopCart.cart.totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
};

export default Cart;
