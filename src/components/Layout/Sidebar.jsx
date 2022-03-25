import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as Lupa } from '../../assets/iconoLupa.svg';
import { ReactComponent as Nuevo } from '../../assets/nuevo.svg';
import { ReactComponent as Inicio } from '../../assets/inicio.svg';
import { ReactComponent as Usuario } from '../../assets/usuario.svg';
import './Nav.scss';
import './Layout.scss';
import './NavBar/MenuBurger.scss';
import SweetAlert2 from 'react-sweetalert2';
import Popup from '../Auth/Popup/PopUp';
import { useAuth } from '../../contexts/authContext';
import { FiLogOut } from 'react-icons/fi';
import { FaTimes, FaBars } from 'react-icons/fa';

function Sidebar() {
    const [sidebar, setSidebar] = useState(false);
    const [menuburger, setMenuburger] = useState(false);
    const [showLogin, setShowLogin] = useState([]);
    const [userMenu, setUserMenu] = useState(false);
    const { isLogged, accountLogout } = useAuth();

    const LoginPopup = () => {
        setShowLogin({
            show: true,
            showConfirmButton: false,
            showCloseButton: true,
        });
    };

    const showUserMenu = () => {
        setUserMenu(!userMenu);
    };

    useEffect(() => {
        setMenuburger(true);
    }, []);

    return (
        <>
            <div className={sidebar ? 'sidebar active' : 'sidebar'}>
                <ul className="sidebar-items">
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
                                        <Popup />
                                    </SweetAlert2>
                                </>
                            ) : (
                                <>
                                    <Usuario onClick={() => showUserMenu()} />
                                    {userMenu && (
                                        <ul className="sidebar-userMenu">
                                            <li>
                                                <NavLink
                                                    to="/my-account"
                                                    className="dropdown-user"
                                                >
                                                    Perfil
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
