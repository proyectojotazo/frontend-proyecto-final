import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Spinner from '../common/Spinner';
import ArticleInfo from './../common/ArticleInfo';
import UserInfo from './../common/UserInfo';

import Comentarios from './Comentarios';
import FormularioComentario from './FormularioComentario';

import { useAuth } from '../../contexts/authContext';
import useDetailedArticle from './../../hooks/useDetailedArticle';
import urlConvert from '../../utils/urlConvert';

import './articulo.scss';
import ErrorMsg from './../common/ErrorMsg';

const imgHolder = 'https://via.placeholder.com/350?text=No+Image';

function Articulo() {
    const { isLogged } = useAuth();
    const { id } = useParams();

    const { art, loading, error, updateComments, deleteComments } =
        useDetailedArticle(id);

    if (loading) return <Spinner />;

    if (error.active) {
        return <ErrorMsg msg={error.message} />;
    }

    return (
        <>
            <Helmet>
                <title>{art.titulo} | El Último & Me Voy</title>
                <meta name="description" content={art.textoIntroductorio} />
            </Helmet>
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
                    <ArticleInfo article={art} customClass="articulo__info" />
                </div>
                <div className="articulo__shareButtons"></div>
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
                </section>

                <Comentarios
                    ownerArt={art.usuario[0]._id}
                    comentarios={art.comentarios}
                    deleteComments={deleteComments}
                />
                {isLogged && (
                    <FormularioComentario
                        articleId={art._id}
                        updateComments={updateComments}
                    />
                )}
            </div>
        </>
    );
}

export default Articulo;
