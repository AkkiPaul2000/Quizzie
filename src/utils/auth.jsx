// src/utils/auth.js
import React, { createContext, useContext, useState } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  });
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token ? jwt_decode(token) : null;
  });

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setUser(jwt_decode(token));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};