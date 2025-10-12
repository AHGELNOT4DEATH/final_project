import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [limits, setLimits] = useState({
    usedCompanies: 34,
    companyLimit: 100,
    isLoading: false
  });

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    // Имитация загрузки лимитов
    setLimits(prev => ({ ...prev, isLoading: true }));
    setTimeout(() => {
      setLimits(prev => ({ ...prev, isLoading: false }));
    }, 1000);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setLimits({ usedCompanies: 0, companyLimit: 0, isLoading: false });
  };

  const value = {
    isLoggedIn,
    user,
    limits,
    login,
    logout,
    setLimits
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};