import React, { useEffect, useState } from "react";
import {getArticulosId} from '../../api/services/articulos';
import { useLocation, useNavigate } from 'react-router-dom';
import Info from "./Info";

function Articulo () {
    const [art, setArt] = useState('')
    const navigat = useNavigate()
    const location = useLocation()


    useEffect(() => {
        const id = location.pathname.split('/')[2]
        getArticulosId(id).then((articulo) => {
            setArt(articulo);
        });
    }, [art]);

    return(
        <div>
            <h1>{art.titulo}</h1>
        </div>
    );
}

export default Articulo;