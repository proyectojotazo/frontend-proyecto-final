import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../common/Spinner';
import Comentarios from './Comentarios';
import FormularioComentario from './FormularioComentario';
import ArticleInfo from './../common/ArticleInfo';

import { getArticulosId } from '../../api/services/articulos';
import { useAuth } from '../../contexts/authContext';

import './articulo.scss';

const parseImgUrl = (url) =>
    `${process.env.REACT_APP_API_BASE_URL}/${url.replace('public\\', '')}`;

function Articulo() {
    const { isLogged } = useAuth();

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

    const updateComments = (comment) => {
        setArticulo((prev) => ({
            ...prev,
            comentarios: [...prev.comentarios, comment],
        }));
    };

    if (loading) return <Spinner />;

    if (error.active) {
        return <p className="articulo__error">{error.message}</p>;
    }

    return (
        <div className="articulo__container">
            <h1 className="articulo__titulo">{art.titulo}</h1>
            <ul className="articulo__categorias-wrapper">
                {art.categorias.map((cat) => (
                    <p key={cat} className={`categorias__item ${cat}`}>
                        {cat}
                    </p>
                ))}
            </ul>
            {/* <ArticleInfo article={art} /> */}

            <div className="articulo__imgPortada-wrapper">
                {art.archivoDestacado && (
                    <img
                        src={parseImgUrl(art.archivoDestacado)}
                        alt="Imagen titular"
                    />
                )}
            </div>
            <section className="articulo__textoContenido-wrapper">
                <h3 className="articulo__textoIntroductorio">
                    {art.textoIntroductorio}
                </h3>
                <p className="articulo__contenido">{art.contenido}</p>
            </section>
            <Comentarios comentarios={art.comentarios} />
            {isLogged && (
                <FormularioComentario
                    articleId={art._id}
                    updateComments={updateComments}
                />
            )}
        </div>
    );
}

export default Articulo;
