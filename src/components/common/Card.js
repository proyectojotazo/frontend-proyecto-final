import React from 'react';
import { Link } from 'react-router-dom';

import Categoria from './Categoria';
import ArticleInfo from './ArticleInfo';

import './card.scss';
import UserInfo from './UserInfo';

function Card({ cambiarCategoria, articulo }) {
    const user = articulo.usuario[0];
    const _id = articulo._id;
    return (
        <div className="card">
            <Link to={`/articles/${_id}`}>
                <div className="imgportada">
                    <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}
                        alt="avatar"
                    />
                </div>
            </Link>
            <Categoria
                categoria={articulo.categorias}
                cambiarCategoria={cambiarCategoria}
            />
            <Link to={`/articles/${_id}`}>
                <h2>{articulo.titulo}</h2>
                <p className="textoIntroductorio">
                    {articulo.textoIntroductorio}
                </p>
                <hr />
            </Link>
            <ArticleInfo article={articulo} />
            <UserInfo user={user} />
        </div>
    );
}

export default Card;
