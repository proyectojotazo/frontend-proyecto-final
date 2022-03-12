import React, { useEffect, useState } from "react";
import "./info.scss"
import { FaRegHeart, FaRegComments, FaRegPaperPlane, FaRegEdit } from "react-icons/fa"

function Info ({...articulo}) {
    const date = new Date(articulo.fechaPublicacion)
    const representarFecha = date.toDateString()

    const [seguir, setSeguir] = useState('')

    useEffect(() => {
        console.log('hola')
    }, [seguir]);
    

    return (
        <div className="info padre">
                <div className="info">
                    <div className="avatar"><img src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}></img></div>
                    <div>
                        <p className="usuario">{articulo.usuario[0].nickname}</p>
                        <p className="fecha">{representarFecha}</p>
                    </div>
                </div>
                <div className="iconosInfo">
                    <ul className="uinfo">
                        <li className="listaIconos "><FaRegComments className="iconos comentarios"/>5 </li>
                        <li className="listaIconos "><FaRegHeart className="iconos corazon"/>4</li>
                        <li className="listaIconos "><FaRegPaperPlane className="iconos enviar"/></li>
                        <li className="listaIconos "><FaRegEdit className="iconos contestar"/></li>
                    </ul>
                </div>
        </div>
    )
}

export default Info;