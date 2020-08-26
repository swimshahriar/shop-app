import { createContext } from 'react';

export const ShopContext = createContext({
  isLogedIn: false,
  userId: null,
  token: null,
  cart: { items: [], totalPrice: 0 },
  login: () => {},
  logout: () => {},
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
});
