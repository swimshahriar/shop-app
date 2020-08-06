import { useEffect, useCallback, useState } from 'react';

let logOutTimer;

export const useAuth = () => {
  const [isToken, setIsToken] = useState(false);
  const [tokenExpirationTime, setTokenExpirationTime] = useState();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  const login = useCallback((userId, token, expirationTime) => {
    setIsToken(true);
    setUserId(userId);
    setToken(token);

    // token expiration timer
    const tokenExpirationTime =
      expirationTime || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationTime(tokenExpirationTime);

    // adding userid and token to browser local storage
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId,
        token,
        expiration: tokenExpirationTime.toISOString(),
      })
    );
  }, []);

  // checking if the token is available in the local storage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const logout = useCallback(() => {
    setIsToken(false);
    setTokenExpirationTime(null);
    setUserId(null);
    setToken(null);

    // removing data from local storage
    localStorage.removeItem('userData');
  }, []);

  // timer for auto logout
  useEffect(() => {
    if (token && tokenExpirationTime) {
      const remainingTime =
        tokenExpirationTime.getTime() - new Date().getTime();
      logOutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logout, tokenExpirationTime]);
  return { token, isToken, userId, login, logout };
};
