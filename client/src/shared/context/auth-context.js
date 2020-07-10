import { createContext } from 'react';

export const AuthContext = createContext({
  isLogedIn: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
