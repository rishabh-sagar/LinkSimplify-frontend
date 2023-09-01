// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
  );
};
