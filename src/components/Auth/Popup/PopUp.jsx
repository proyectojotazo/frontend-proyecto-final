import React, { useState } from "react";

import { useAuth } from "../../../contexts/authContext";

import Login from "../Login/Login";
import RecoverPassword from "../RecoverPassword/RecoverPassword";
import Register from "../Register/Register";

import "./popup.scss";

const Popup = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRecover, setShowRecover] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowRecover(false);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowRecover(false);
  };

  const openRecover = () => {
    setShowRecover(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  const { isLogged, accountLogout } = useAuth();

  return (
    <div>
      {!isLogged ? (
        <div>
          {showLogin && (
            <>
              <Login />
              <div className="recover-link-container">
                <a onClick={openRecover}>¿Has perdido tu contraseña?</a>
              </div>
              <div className="register-link-container">
                <a onClick={openRegister}>Registrate</a>
              </div>
            </>
          )}

          {showRecover && (
            <>
              <RecoverPassword />
              <div className="goback-link-container">
                <a onClick={openLogin}>Volver</a>
              </div>
            </>
          )}

          {showRegister && (
            <>
              <Register />
              <div className="goback-link-container">
                <a onClick={openLogin}>Volver</a>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="welcome-message">
          <h3>Bienvenid@ a El ultimo y me voy :)</h3>
          <button className="logout-submit-button" onClick={accountLogout}>
            Salir
          </button>
        </div>
      )}
    </div>
  );
};

export default Popup;
