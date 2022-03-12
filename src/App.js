import React, { useState } from "react";
import Home from "./pages/Home";
import { Router, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import { logout } from "./api/services/auth";
import Article from "./pages/Article";

function App({ isAlreadyLogged }) {
  const [isLogged, setIsLogged] = useState(isAlreadyLogged);

  const accountLogin = () => {
    setIsLogged(true);
  };

  const accountLogout = () => {
    logout().then(() => setIsLogged(false));
  };

  return (
    <AuthContextProvider value={{ isLogged, accountLogin, accountLogout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
