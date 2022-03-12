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
        <div className="info">
                <div className="info">
                    <div className="avatar"><img src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}></img></div>
                    <div>
                        <p>{articulo.usuario[0].nickname}</p>
                        <p>{representarFecha}</p>
                    </div>
                </div>
                <div className="iconosInfo">
                    <ul className="uinfo">
                        <li className="listaIconos comentarios"><FaRegComments className="iconos"/>5 </li>
                        <li className="listaIconos corazon"><FaRegHeart className="iconos"/>4</li>
                        <li className="listaIconos enviar"><FaRegPaperPlane className="iconos"/></li>
                        <li className="listaIconos contestar"><FaRegEdit className="iconos"/></li>
                    </ul>
                </div>
        </div>
    )
}

export default Info;