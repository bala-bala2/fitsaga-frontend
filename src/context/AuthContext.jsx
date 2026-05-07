import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuthModal = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('login'); // 'login' | 'signup'
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const openModal = (initialView = 'login') => {
    setView(initialView);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const login = () => {
    setIsAuthenticated(true);
    closeModal();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isOpen, view, setView, openModal, closeModal, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
