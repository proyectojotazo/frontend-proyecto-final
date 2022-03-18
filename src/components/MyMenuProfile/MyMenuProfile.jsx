import React from 'react';

import './MyMenuProfile.scss';

function MyMenuProfile({ changeOption }) {
    return (
        <div className="mymenu-profile">
            <ul className="mymenu-lista">
                <li
                    className="mymenu-item"
                    onClick={() => changeOption('mi-perfil')}
                >
                    Mi Perfil
                </li>
                <li
                    className="mymenu-item"
                    onClick={() => changeOption('mis-articulos')}
                >
                    Mis Artículos
                </li>
                <li
                    className="mymenu-item"
                    onClick={() => changeOption('favoritos')}
                >
                    Favoritos
                </li>
                <li
                    className="mymenu-item"
                    onClick={() => changeOption('seguidores')}
                >
                    Seguidores
                </li>
                <li
                    className="mymenu-item"
                    onClick={() => changeOption('seguidos')}
                >
                    Seguidos
                </li>
            </ul>
        </div>
    );
}

export default MyMenuProfile;
