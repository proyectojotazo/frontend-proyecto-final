import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getArticulosId } from '../../api/services/articulos';

import Info from '../common/Info';
import Spinner from '../common/Spinner';
import Comentarios from './Comentarios';
import FormularioComentario from './FormularioComentario';

import './articulo.scss';

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
            <Info art={art} />

            <div className="articulo__imgPortada-wrapper">
                {art.archivoDestacado && (
                    <img
                        src={parseImgUrl(art.archivoDestacado)}
                        alt="Imagen titular"
                    />
                )}
            </div>

            <h1 className="articulo__titulo">{art.titulo}</h1>
            <h3 className="articulo__textoIntroductorio">
                {art.textoIntroductorio}
            </h3>
            <p className="articulo__contenido">{art.contenido}</p>

            <Comentarios comentarios={art.comentarios} />
            <FormularioComentario />
        </div>
    );
}

export default Articulo;
