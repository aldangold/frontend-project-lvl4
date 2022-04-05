import React,  { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
  
    const logIn = (data) => {
      localStorage.setItem('userId', JSON.stringify(data));
      setLoggedIn(true);
    }
    const logOut = () => {
      localStorage.removeItem('userId');
      setLoggedIn(false);
    };


    return (
      <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
        {children}
      </AuthContext.Provider>
    );
  };

export { AuthContext, AuthProvider };