import React from "react";
import { Link } from "react-router-dom";
import "./card.scss"
import Categoria from "./Categoria";
import Info from "./Info";

function Card ({cambiarCategoria, articulo}) {
    return(
        <div className="card">
            <Link key={Math.random()} to={`/articles/${articulo._id}`}>
            <div className="imgportada">
                <img  src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`} alt="avatar"/>
            </div>
            </Link>
            <Categoria categoria={articulo.categorias} cambiarCategoria={cambiarCategoria}/>
            <Link key={Math.random()} to={`/articles/${articulo._id}`}>
            <h2>{articulo.titulo}</h2>
            <p className="textoIntroductorio">{articulo.textoIntroductorio}</p>
            <hr/>
            </Link>
            <Info art={articulo}/>
            
        </div>
    );
}

export default Card;