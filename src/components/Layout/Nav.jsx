import React, { useState } from 'react';
import '../common/tooltip.scss';
import './Nav.scss';
import './Layout.scss';
import './MenuBurger.scss';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logomadeja.svg';

import { Lupa, Inicio, Nuevo, Usuario, Esp, Eng } from '../../assets/icons'
import {FaFlag} from 'react-icons/fa';
import Popup from '../Auth/Popup/PopUp';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../contexts/authContext';

import SweetAlert2 from 'react-sweetalert2';
import Sidebar from './Sidebar';
import i18next from 'i18next';

function Nav() {
    const [showLogin, setShowLogin] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
    const [lenguageMenu, setLenguageMenu] = useState(false);
    const { isLogged, accountLogout, t } = useAuth();

    const LoginPopup = () => {
        setShowLogin({
            show: true,
            showConfirmButton: false,
            showCloseButton: true,
        });
    };

    const closePopup = () => {
        setShowLogin({
            show: false,
        });
    };

    const showUserMenu = () => {
        setUserMenu(!userMenu);
    };

    const showLenguageMenu = () => {
        setLenguageMenu(!lenguageMenu);
    };

    return (
        <>
            <nav className="nav">
                <div className="logo">
                    <Link to="/">
                        <Logo className="logoImg" />
                    </Link>
                </div>

                <ul className="nav-list">
                    <li className="navbar-item">
                        <FaFlag className="icon gr" onClick={() => showLenguageMenu()}/>
                        {lenguageMenu && (
                                        <ul className="userMenu">
                                            <li onClick={()=>i18next.changeLanguage('en')}>
                                                <Eng className="icon"/>
                                            </li>
                                            <li onClick={()=>i18next.changeLanguage('es')}>
                                                <Esp className="icon"/>
                                            </li>
                                        </ul>
                                    )}
                    </li>
                    <li className="navbar-item">
                        <div className="tooltip">
                            <span className="tooltiptext">{t("nav.tooltipSearch")}</span>
                            <NavLink to="/buscar" className="nav-link">
                                <Lupa className="icon icon-lupa" />
                            </NavLink>
                        </div>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/crear" className="nav-link">
                            <div className="tooltip">
                                <span className="tooltiptext">
                                {t("nav.tooltipAddArticle")}
                                </span>
                                <Nuevo className="icon icon-nuevo" />
                            </div>
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink className="nav-link" to="/">
                            <div className="tooltip">
                                <span className="tooltiptext">Home</span>
                                <Inicio className="icon icon-inicio" />
                            </div>
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
                                        <Popup close={closePopup} />
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
                                                {t("nav.profile")}
                                                </NavLink>
                                            </li>
                                            <li onClick={accountLogout}>
                                                <FiLogOut className="logout-nav"></FiLogOut>
                                            </li>
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                </ul>

                <Sidebar></Sidebar>
            </nav>
        </>
    );
}
export default Nav;
