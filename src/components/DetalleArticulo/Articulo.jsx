import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '../common/Spinner';
import Comentarios from './Comentarios';
import FormularioComentario from './FormularioComentario';
import ArticleInfo from './../common/ArticleInfo';
import UserInfo from './../common/UserInfo';

import { getArticulosId } from '../../api/services/articulos';
import { useAuth } from '../../contexts/authContext';
import urlConvert from '../../utils/urlConvert'

import './articulo.scss';

const imgHolder = 'https://via.placeholder.com/350?text=No+Image';

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
            <ul className="articulo__categorias-wrapper">
                {art.categorias.map((cat) => (
                    <p key={cat} className={`categorias__item ${cat}`}>
                        &lt;{cat}&gt;
                    </p>
                ))}
            </ul>
            <h1 className="articulo__titulo">{art.titulo}</h1>
            <div className="articulo__articleInfo">
                <UserInfo user={art.usuario[0]} />
                <ArticleInfo article={art} />
            </div>
            <div className="articulo__imgPortada-wrapper">
                <img
                    src={
                        art.archivoDestacado
                            ? urlConvert(art.archivoDestacado)
                            : imgHolder
                    }
                    alt="Imagen titular"
                />
            </div>
            <section className="articulo__textoContenido-wrapper">
                <h3 className="articulo__textoIntroductorio">
                    {art.textoIntroductorio}
                </h3>
                <div className="articulo__contenido" dangerouslySetInnerHTML={{ __html: art.contenido }}></div>{' '}
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
