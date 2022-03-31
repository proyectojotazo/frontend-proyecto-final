import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { Lupa, Inicio, Nuevo, Usuario, Esp, Eng } from '../../assets/icons';
import './Nav.scss';
import './Layout.scss';
import './MenuBurger.scss';
import SweetAlert2 from 'react-sweetalert2';
import Popup from '../Auth/Popup/PopUp';
import { useAuth } from '../../contexts/authContext';
import { FiLogOut } from 'react-icons/fi';
import { FaTimes, FaBars, FaFlag } from 'react-icons/fa';
import { getUser } from '../../api/services/auth';

import urlConvert from '../../utils/urlConvert';
import i18next from 'i18next';
import '../../pages/MyAccount.scss';

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const [menuburger, setMenuburger] = useState(false);
    const [showLogin, setShowLogin] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
    const { isLogged, accountLogout, dataUser } = useAuth();
    const [lenguageMenu, setLenguageMenu] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState([]);

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

    useEffect(() => {
        setMenuburger(true);
        if (isLogged) {
            getUser(dataUser()).then((data) => {
                data.avatar = urlConvert(data.avatar);
                setDatosUsuario(data);
            });
        }
    }, [dataUser]);

    return (
        <>
            <div className={sidebar ? 'sidebar active' : 'sidebar'}>
                <ul className="sidebar-items">
                    <li className="sidebar-item">
                        <FaFlag
                            className="icon gr"
                            onClick={() => showLenguageMenu()}
                        />
                        {lenguageMenu && (
                            <ul className="siderMenu">
                                <li
                                    onClick={() => i18next.changeLanguage('en')}
                                >
                                    <Eng className="icon" />
                                </li>
                                <li
                                    onClick={() => i18next.changeLanguage('es')}
                                >
                                    <Esp className="icon" />
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className="sidebar-item ">
                        <NavLink to="/buscar">
                            <Lupa className="icon-lupa" />
                        </NavLink>
                    </li>
                    <li className="sidebar-item ">
                        <NavLink to="/crear">
                            <Nuevo className="icon-nuevo" />
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <NavLink to="/">
                            <Inicio className="icon-inicio" />
                        </NavLink>
                    </li>
                    <li className="sidebar-item">
                        <div>
                            {!isLogged ? (
                                <>
                                    <Usuario
                                        className="icon-usuario"
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
                                    <div className="profile-avatar-sidebar">
                                        <img
                                            src={datosUsuario.avatar}
                                            className="avatar-sidebar"
                                            alt="avatar"
                                            onClick={() => showUserMenu()}
                                        />
                                    </div>
                                    {/* <Usuario onClick={() => showUserMenu()} /> */}
                                    {userMenu && (
                                        <ul className="siderMenu">
                                            <li>
                                                <NavLink
                                                    to="/my-account"
                                                    className="dropdown-user"
                                                >
                                                    <span className="text-sidebar">
                                                        Perfil
                                                    </span>
                                                </NavLink>
                                            </li>
                                            <li
                                                onClick={accountLogout}
                                                className="logout-icon"
                                            >
                                                <FiLogOut></FiLogOut>
                                            </li>
                                        </ul>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                </ul>
            </div>

            {menuburger && (
                <div className="mobile-bar">
                    <div className="sidebar-toggle">
                        {sidebar ? (
                            <FaTimes
                                className="sidebar-toggle-logo"
                                onClick={() => setSidebar(!sidebar)}
                            />
                        ) : (
                            <FaBars
                                className="sidebar-toggle-logo"
                                onClick={() => setSidebar(!sidebar)}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Sidebar;
