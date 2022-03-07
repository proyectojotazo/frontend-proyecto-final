import React from 'react';
import './nav.scss';
import './layout.scss';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/LOGO.svg';
import { ReactComponent as Lupa } from '../../assets/iconoLupa.svg';
import { ReactComponent as Nuevo } from '../../assets/nuevo.svg';
import { ReactComponent as Inicio } from '../../assets/inicio.svg';
import { ReactComponent as Usuario } from '../../assets/usuario.svg';


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import LoginPopup from '../Auth/Login/Login';

const MySwal = withReactContent(Swal);

function Nav() {
    return (
        <nav className='nav'>
            <div className='logo' >
                <Link to='/'>
                    <Logo width="150" height="100" />
                </Link>
            </div>

            <ul className="nav-list">
                <li className='navbar-item'>
                    <NavLink exact to='/' className='nav-link'>
                        <Lupa
                            className='icon icon-lupa'
                        />
                    </NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink exact to='/' className='nav-link'>
                        <Nuevo
                            className='icon icon-nuevo'
                        />
                    </NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink className='nav-link' exact to='/escribir'>
                        <Inicio
                            className='icon icon-inicio'
                        />
                    </NavLink>
                </li>
                <li className='navbar-item'>
                    <NavLink className='nav-link' exact to='/ Iniciar Sesión'>
                        <Usuario
                            className='icon icon-usuario'
                            onClick={() => LoginPopup()}
                        />
                    </NavLink>
                </li>
            </ul>
        </nav>
    );

}

export default Nav;
