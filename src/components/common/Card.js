import React from "react";
import { Link } from "react-router-dom";
import { getArticulosId } from "../../api/services/articulos";
import "./card.scss"
import Categoria from "./Categoria";
import Info from "./Info";

function Card ({ cambiarCategoria, advert}) {
    const art = advert
    const _id = advert._id
    return(
        <div className="card">
            <Link key={Math.random()} to={`/articles/${_id}`}>
            <div className="imgportada">
                <img  src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`} alt="avatar"/>
            </div>
            </Link>
            <Categoria categoria={advert.categorias} cambiarCategoria={cambiarCategoria}/>
            <Link key={Math.random()} to={`/articles/${_id}`}>
            <h2>{advert.titulo}</h2>
            <p className="textoIntroductorio">{advert.textoIntroductorio}</p>
            <hr/>
            </Link>
            <Info art={advert}/>
            
        </div>
    );
}

export default Card;