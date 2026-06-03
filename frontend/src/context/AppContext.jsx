import { createContext, useContext, useMemo, useState } from 'react';

const AppContext = createContext(null);

const getStored = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => getStored('cartItems', []));
  const [userInfo, setUserInfo] = useState(() => getStored('userInfo', null));

  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product, quantity = 1) => {
    const exists = cartItems.find((item) => item._id === product._id);
    const nextItems = exists
      ? cartItems.map((item) => (item._id === product._id ? { ...item, quantity } : item))
      : [...cartItems, { ...product, quantity }];
    saveCart(nextItems);
  };

  const removeFromCart = (id) => {
    saveCart(cartItems.filter((item) => item._id !== id));
  };

  const clearCart = () => saveCart([]);

  const login = (user) => {
    setUserInfo(user);
    localStorage.setItem('userInfo', JSON.stringify(user));
  };

  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    clearCart();
  };

  const value = useMemo(
    () => ({ cartItems, userInfo, addToCart, removeFromCart, clearCart, login, logout }),
    [cartItems, userInfo]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
