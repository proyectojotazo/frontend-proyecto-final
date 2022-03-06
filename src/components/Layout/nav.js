import React from 'react';
import './Nav.scss';
import './layout.scss';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import LoginPopup from '../Auth/Login/Login';

const MySwal = withReactContent(Swal);

function Nav() {
  return (
    <nav className="nav">
      Nav
      <button className="login-button" onClick={() => LoginPopup()}>
        Login
      </button>
    </nav>
  );
}

export default Nav;
