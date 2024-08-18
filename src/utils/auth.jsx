import React, { createContext, useContext, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import the jwtDecode function
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // ... (Store token in localStorage if needed)
    setIsLoggedIn(true);
    setUser(userData); 
    console.log(jwtDecode(userData)  )
  };

  const logout = () => {
    // ... (Remove token from localStorage if needed)
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