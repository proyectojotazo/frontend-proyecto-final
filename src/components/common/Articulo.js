import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArticulosId } from '../../api/services/articulos';

import Info from './Info';
import Spinner from './Spinner';

import './Articulo.scss';
import Categoria from './Categoria';

const parseImgUrl = (url) =>
    `${process.env.REACT_APP_API_BASE_URL}/${url.replace('public\\', '')}`;

function Articulo() {
    const [art, setArticulo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        message: '',
        active: false,
    });
    const { id } = useParams();

    const obtenerNick = (idUsuarioComentario)=>{
        // tengo que ver como hacer la peticion para obtener el usuario porque de momento solo se puede hacer con el nickname
        return idUsuarioComentario
    }

    const formatearFecha = (fecha) =>{
        const date = new Date(fecha)
        return date.toUTCString()
    }


    useEffect(() => {
        getArticulosId(id)
            .then(setArticulo)
            .catch((err) => setError({ message: err.message, active: true }))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Spinner />;

    if (error.active) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="articulo__container">
            <div className="artAncho">
            <h1 className="articulo__titulo">{art.titulo}</h1>
            <Categoria categoria={art.categorias}/>
            <Info art={art} className='infoArticulo info padre'/>

            {/* Esto es solo provisional hasta que todos los articulos tengan foto */}
            <div className="imgportada">
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/upload/hastaloshuevos.jpg`}
                    alt="avatar"
                />
            </div>

            <div className="articulo__imgPortada">
                {art.archivoDestacado && (
                    <img
                        src={parseImgUrl(art.archivoDestacado)}
                        alt="Imagen titular"
                    />
                )}
            </div>

            <h3 className="articulo__textoIntroductorio">
                {art.textoIntroductorio}
            </h3>
            <p className="articulo__contenido">{art.contenido}</p>
            {/* TODO: Crear componente con la info del comentario */}

            <div className="articulo__container-comentarios">
                <h3>Comentarios:</h3>
                
                {art.comentarios.length>0 
                    ? <>
                        {art.comentarios.map((comentario) => (
                        <div className='comentario__contenedor'>
                            <p key={comentario.id} className="comentario__texto-comentario-usuario">
                                {obtenerNick(comentario.usuario)}
                            </p>
                            <p key={comentario.id} className="comentario__texto-comentario-fecha">
                                {formatearFecha(comentario.fechaPublicacion)}
                            </p>
                            <p key={comentario.fechaPublicacion} className="comentario__texto-comentario-contenido">
                                {comentario.contenido}
                            </p>
                        </div>
                        ))}
                    </>
                    : <p>Este articulo no tiene comentarios todavía</p>
                }
            </div>
            </div>
        </div>
    );
}

export default Articulo;
