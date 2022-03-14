import React, { useContext, useEffect, useState } from "react";
import "./info.scss"
import { FaHeart, FaRegHeart, FaRegComments, FaRegPaperPlane, FaRegEdit } from "react-icons/fa"
import AuthContext from "../../contexts/authContext";
import getAuthUserId from "../../utils/token";
import { artFav, getUser } from "../../api/services/auth";

function Info ({art}) {
    const date = new Date(art.fechaPublicacion)
    const representarFecha = date.toUTCString()
    const { isLogged } = useContext(AuthContext)
    const usuarioLogueado= getAuthUserId()


    const [corazonRelleno, setCorazon] = useState(false)

    const articuloEsFavorito =(usuarioArticulos)=>{
        const resultado = usuarioArticulos.map((x)=>{if (x._id===art._id) { return true } else {return false}});
        return resultado.find((x)=>x===true ?true :false)
    }

    const artFavorito = (artId) => {
        setCorazon(!corazonRelleno)
        artFav(artId)
    }

    useEffect(() => {
        getUser(usuarioLogueado).then((x) => {
          const articulosFavoritos = x.usuario.articulos.favoritos;
          if (articuloEsFavorito(articulosFavoritos)) {
            setCorazon(true)
          } else {
            setCorazon(false) 
          }
          
        });
      }, [corazonRelleno]);

    return (
        <div className="info padre">
                <div className="info">
                    <div className="avatar"><img src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`}></img></div>
                    <div>
                        <p className="usuario">{art.usuario[0].nickname} </p>
                        <p className="fecha">{representarFecha}</p>
                    </div>
                </div>
                <div className="iconosInfo">
                    <ul className="uinfo">
                        <li className="listaIconos "><FaRegComments className="iconos comentarios"/>{art.comentarios.length}</li>
                        {isLogged && 
                        <>
                        {corazonRelleno===true &&
                        <li className="listaIconos " onClick={()=>artFavorito(art._id)}><FaHeart className="iconos corazon"/></li>
                        } 
                        {corazonRelleno===false &&
                        <li className="listaIconos " onClick={()=>artFavorito(art._id)}><FaRegHeart className="iconos corazon"/></li>
                        }
                        
                        <li className="listaIconos "><FaRegEdit className="iconos contestar"/></li>
                        </>}
                        <li className="listaIconos "><FaRegPaperPlane className="iconos enviar"/></li>
                        
                    </ul>
                </div>
        </div>
    )
}

export default Info;