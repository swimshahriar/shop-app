import { createContext } from 'react';

export const ShopContext = createContext({
  isLogedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
  cart: () => {},
});
