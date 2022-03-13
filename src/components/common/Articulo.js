import React, { useEffect, useState } from "react";
import {getArticulosId} from '../../api/services/articulos';
import { useLocation, useNavigate } from 'react-router-dom';
import Info from "./Info";

function Articulo () {
    const [art, setArticulo] = useState('')
    const location = useLocation()
    const id = location.pathname.split('/')[2]

    useEffect(() => {
        getArticulosId(id).then((x) => {
            setArticulo(x);
        });
    }, [id]);


    return(
        <div>
            { art && (
                <Info art={art}/>
                
            )}
            
            <div className="imgportada">
                <img  src={`${process.env.REACT_APP_API_BASE_URL}/upload/avatar_default.jpg`} alt="avatar"/>
            </div>
            
            <h1>{art.titulo}</h1>
            <h3>{art.textoIntroductorio}</h3>
            <p>{art.contenido}</p>
            <div>
                {/* { art && art.comentarios.length>0 && (
                    art.comentarios.map((x)=>(
                        <p>{x}</p>
                    ))
                )} */}
            </div>
        </div>
    );
}

export default Articulo;