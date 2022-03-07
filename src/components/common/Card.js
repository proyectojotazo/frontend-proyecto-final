import React from "react";
import "./card.scss"

function Card ({...articulo}) {

    return(
        <div className="card">
            <div className="imgportada">
                <img  src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`} alt="avatar"/>
            </div>
            <p className="cat">{articulo.categorias}</p>
            <h2>{articulo.titulo}</h2>
            <p className="textoIntroductorio">{articulo.textoIntroductorio}</p>
            <hr/>
            <div className="info">
                <div className="info">
                    <div className="avatar"><img src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}></img></div>
                    <div>
                        <p>{articulo.usuario[0].nickname}</p>
                        <p>{articulo.fechaPublicacion}</p>
                    </div>
                </div>
                <div className="iconosInfo">
                    <ul className="info">
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Card;