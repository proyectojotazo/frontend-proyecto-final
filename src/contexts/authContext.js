import React, { useContext } from 'react';

const AuthContext = React.createContext();

export const AuthContextProvider = AuthContext.Provider;
export const AuthContextConsumer = AuthContext.Consumer;

export const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default AuthContext;
