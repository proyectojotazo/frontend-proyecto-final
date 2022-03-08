import React, { useState } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';

import { Route, Routes } from 'react-router-dom';

import { AuthContextProvider } from './contexts/authContext';
import { logout } from './api/services/auth';

function App({ isAlreadyLogged }) {
  const [isLogged, setIsLogged] = useState(isAlreadyLogged);

  const accountLogin = () => {
    console.log('yeeep');
    setIsLogged(true);
  };

  const accountLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <AuthContextProvider value={{ isLogged, accountLogin, accountLogout }}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
