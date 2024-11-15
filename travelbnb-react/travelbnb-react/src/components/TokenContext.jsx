import React, { createContext, useState, useContext } from 'react';

// Create the TokenContext
const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Save the token to local storage and state
  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  // Remove the token from local storage and state
  const removeToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Provide both token value and actions (save/remove) to children components
  return (
    <TokenContext.Provider value={{ token, saveToken, removeToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// Custom hook to use the TokenContext
export const useToken = () => useContext(TokenContext);
