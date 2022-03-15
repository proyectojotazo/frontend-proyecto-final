import React, { useContext, useState, useEffect } from 'react';
import './Nav.scss';
import './Layout.scss';
import './NavBar/MenuBurger.scss';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logomadeja.svg';
import { ReactComponent as Lupa } from '../../assets/iconoLupa.svg';
import { ReactComponent as Nuevo } from '../../assets/nuevo.svg';
import { ReactComponent as Inicio } from '../../assets/inicio.svg';
import { ReactComponent as Usuario } from '../../assets/usuario.svg';
import Login from '../Auth/Login/Login';
import Popup from '../Auth/Popup/PopUp';
import * as Icons from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

import { useAuth } from '../../contexts/authContext';

import SweetAlert2 from 'react-sweetalert2';

function Nav() {
    const [showLogin, setShowLogin] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
    const { isLogged, accountLogout } = useAuth();

    function LoginPopup() {
        setShowLogin({
            show: true,
            showConfirmButton: false,
            showCloseButton: true,
        });
    }

    const showUserMenu = () => {
        setUserMenu(!userMenu);
    };

    return (
        <nav className="nav">
            <div className="logo">
                <Link to="/">
                    <Logo className="logoImg" />
                </Link>
            </div>

            <ul className="nav-list">
                <li className="navbar-item">
                    <NavLink to="/" className="nav-link">
                        <Lupa className="icon icon-lupa" />
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/crear" className="nav-link">
                        <Nuevo className="icon icon-nuevo" />
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink className="nav-link" to="/escribir">
                        <Inicio className="icon icon-inicio" />
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <div>
                        {!isLogged ? (
                            <>
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
                            </>
                        ) : (
                            <>
                                <Usuario
                                    className="icon icon-usuario"
                                    onClick={() => showUserMenu()}
                                />
                                {userMenu && (
                                    <ul className="userMenu">
                                        <li>
                                            <NavLink
                                                to="/my-account"
                                                className="dropdown-user"
                                            >
                                                Perfil
                                            </NavLink>
                                        </li>
                                        <li onClick={accountLogout}>
                                            Cerrar Sesión
                                        </li>
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
}
export default Nav;
