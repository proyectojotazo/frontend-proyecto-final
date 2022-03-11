import React, { useState } from "react";

import { useAuth } from "../../../contexts/authContext";

import Login from "../Login/Login";
import RecoverPassword from "../RecoverPassword/RecoverPassword";

import "./popup.scss";

const Popup = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRecover, setShowRecover] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const { isLogged, accountLogout } = useAuth();

  return (
    <div>
      {!isLogged ? (
        <div>
          {showLogin && (
            <>
              <Login />
              <div className="recover-link-container">
                <a
                  onClick={() => {
                    setShowRecover(true);
                    setShowLogin(false);
                  }}
                >
                  ¿Has perdido tu contraseña?
                </a>
              </div>
              <div className="register-link-container">
                <a href="">Registrate</a>
              </div>
            </>
          )}

          {showRecover && (
            <>
              <RecoverPassword />
              <div className="goback-link-container">
                <a
                  onClick={() => {
                    setShowRecover(false);
                    setShowLogin(true);
                  }}
                >
                  Volver
                </a>
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
