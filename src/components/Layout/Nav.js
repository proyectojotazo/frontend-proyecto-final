import React, { useContext, useState, useEffect } from "react";
import "./Nav.scss";
import "./Layout.scss";
import "./NavBar/MenuBurger.scss";
import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Lupa } from "../../assets/iconoLupa.svg";
import { ReactComponent as Nuevo } from "../../assets/nuevo.svg";
import { ReactComponent as Inicio } from "../../assets/inicio.svg";
import { ReactComponent as Usuario } from "../../assets/usuario.svg";
import LogoMa from '../../assets/logomadeja.png';
import Login from "../Auth/Login/Login";
import Popup from "../Auth/Popup/PopUp";
import * as Icons from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import { useAuth } from "../../contexts/authContext";

import SweetAlert2 from "react-sweetalert2";

function Nav() {
  const [showLogin, setShowLogin] = useState({});
  const [showRegister, setShowRegister] = useState({});
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  function LoginPopup() {
    setShowLogin({
      show: true,
      showConfirmButton: false,
      showCloseButton: true,
    });
  }

  useEffect(() => {
    if (window.innerWidth < 900) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
      <nav className="nav">
        <div className="logo">
          <Link to="/">
            <Logo className="logoImg"/>
            {/* <img src={LogoMa} className="logoImg"/> */}
          </Link>
        </div>

        {!mobile && (
          < ul className="nav-list">
            <li className="navbar-item">
              <NavLink to="/" className="nav-link">
                <Lupa className="icon icon-lupa" />
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/" className="nav-link">
                <Nuevo className="icon icon-nuevo" />
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="nav-link" to="/escribir">
                <Inicio className="icon icon-inicio" />
              </NavLink>
            </li>
            <li className="navbar-item">
              <div className="nav-link">
                <Usuario
                  className="icon icon-usuario"
                  onClick={() => LoginPopup()}
                />
                <SweetAlert2
                  {...showLogin}
                  didClose={() => {
                    setShowLogin({
                      show: false,
                    });
                  }}
                >
                  <Popup />
                </SweetAlert2>
              </div>
            </li>
          </ul>
        )} {mobile}

        {mobile && (
          <div className="sidebar-toggle">
            {sidebar ? (
              <Icons.FaTimes
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            ) : (
              <Icons.FaBars
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            )}
          </div>
        )}
      </nav>

      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="nav-list">
          <li className="sidebar-item ">
            <NavLink to="/" className="nav-link">
              <Lupa className="icon icon-lupa" />
            </NavLink>
          </li>
          <li className="sidebar-item ">
            <NavLink to="/" className="nav-link">
              <Nuevo className="icon icon-nuevo" />
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink className="nav-link" to="/escribir">
              <Inicio className="icon icon-inicio" />
            </NavLink>
          </li>
          <li className="sidebar-item">
            <div className="nav-link">
              <Usuario
                className="icon icon-usuario"
                onClick={() => LoginPopup()}
              />
              <SweetAlert2
                {...showLogin}
                didClose={() => {
                  setShowLogin({
                    show: false,
                  });
                }}
              >
                <Popup />
              </SweetAlert2>
            </div>
          </li>
        </ul>


      </div>


    </>
  );
}

export default Nav;
