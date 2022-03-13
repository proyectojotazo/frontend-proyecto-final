import React, { useState } from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
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

  const dataUser = () => {
    if (isLogged) {
      const token = localStorage.getItem("auth");
      if (token === null) {
        return null;
      }
      const b64Parts = token.split(".");
      if (b64Parts.length !== 3) {
        return null;
      }
      const b64Data = b64Parts[1];
      try {
        const userJSON = atob(b64Data);
        const user = JSON.parse(userJSON);
        return user;
      } catch (error) {
        console.error("Error while decoding JWT Token", error);
        return null;
      }
    }
  };

  return (
    <AuthContextProvider
      value={{ isLogged, accountLogin, accountLogout, dataUser }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles/:id" element={<Article />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
