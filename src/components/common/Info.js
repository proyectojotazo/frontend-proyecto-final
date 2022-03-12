import React, { useContext } from "react";
import "./info.scss"
import { FaHeart, FaRegHeart, FaRegComments, FaRegPaperPlane, FaRegEdit } from "react-icons/fa"
import AuthContext from "../../contexts/authContext";

function Info ({art}) {
    const date = new Date(art.fechaPublicacion)
    const representarFecha = date.toDateString()
    const { isLogged } = useContext(AuthContext)


    return (
        <div className="info padre">
                <div className="info">
                    <div className="avatar"><img src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}></img></div>
                    <div>
                        <p className="usuario">{art.usuario[0].nickname}</p>
                        <p className="fecha">{representarFecha}</p>
                    </div>
                </div>
                <div className="iconosInfo">
                    <ul className="uinfo">
                        <li className="listaIconos "><FaRegComments className="iconos comentarios"/>{art.comentarios.length}</li>
                        {isLogged && 
                        <>
                        <li className="listaIconos "><FaRegHeart className="iconos corazon"/></li>
                        <li className="listaIconos "><FaRegEdit className="iconos contestar"/></li>
                        </>}
                        <li className="listaIconos "><FaRegPaperPlane className="iconos enviar"/></li>
                        
                    </ul>
                </div>
        </div>
    )
}

export default Info;