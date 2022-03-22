import { useState } from 'react'

import { useParams, Navigate } from 'react-router-dom';

import Spinner from '../common/Spinner';
import ArticleInfo from './../common/ArticleInfo';
import UserInfo from './../common/UserInfo';
import ShareButtons from '../common/ShareButtons';

import Comentarios from './Comentarios';
import FormularioComentario from './FormularioComentario';

import { useAuth } from '../../contexts/authContext';
import useDetailedArticle from './../../hooks/useDetailedArticle';
import urlConvert from '../../utils/urlConvert'

import './articulo.scss';

const imgHolder = 'https://via.placeholder.com/350?text=No+Image';
const urlArt = `${process.env.REACT_APP_API_BASE_URL}/articles/`;

function Articulo() {
    const { isLogged } = useAuth();
    const { id } = useParams();

    const {art, loading, error, updateComments} = useDetailedArticle(id)

    const [redirectToResponder, setRedirectToResponder] = useState(false);
    if (redirectToResponder) {
        return <Navigate to={`/responder/${id}`} replace={true} />;
    }

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
            <div className="articulo__shareButtons">
                <ShareButtons
                    url={urlArt + art._id}
                    titulo={art.titulo}
                    resumen={art.textoIntroductorio}
                />
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
                <div
                    className="articulo__contenido"
                    dangerouslySetInnerHTML={{ __html: art.contenido }}
                ></div>{' '}
                <button
                    className="button-responder-articulo"
                    onClick={() => setRedirectToResponder(true)}
                >
                    Responder a este artículo
                </button>
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
