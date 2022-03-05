import React from "react";
import "./card.scss"

function Card () {
    const listaarticulo = require('./prueba.json')
    const articulo = listaarticulo[1]


    return(
        <div className="card">
            <div className="imgportada">
                <img src="https://fotografias.antena3.com/clipping/cmsimages01/2021/05/02/26E03450-C5FB-4D16-BC9B-B282AE784352/57.jpg"></img>
            </div>
            <p className="cat">{articulo.categorias}</p>
            <h2>{articulo.titulo}</h2>
            <p className="textoIntroductorio">{articulo.textoIntroductorio}</p>
            <hr/>
            <div className="info">
                <div className="info">
                    <div className="avatar"><img src="https://fotografias.antena3.com/clipping/cmsimages01/2021/05/02/26E03450-C5FB-4D16-BC9B-B282AE784352/57.jpg"></img></div>
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