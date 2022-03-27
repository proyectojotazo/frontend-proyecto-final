import React from 'react';
import { Link } from 'react-router-dom';

import Categoria from './Categoria';
import ArticleInfo from './ArticleInfo';

import './card.scss';

import urlConvert from '../../utils/urlConvert';

const imgHolder = 'https://via.placeholder.com/350?text=No+Image';

function Card({ cambiarCategoria, articulo }) {
    const _id = articulo._id;
    return (
        <div className="card">
            <Link to={`/articles/${_id}`}>
                <div className="imgportada">
                    <img
                        src={urlConvert(articulo.archivoDestacado) || imgHolder}
                        alt="archivo destacado"
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
        </div>
    );
}

export default Card;
