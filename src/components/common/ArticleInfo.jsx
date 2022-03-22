import {
    FaRegStar,
    FaStar,
    FaRegComments,
    FaRegPaperPlane,
    FaRegEdit,
} from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import getMoment from '../../utils/getMoment';

import { addArticleFavorite } from '../../api/services/usuarios';

import './articleInfo.scss';
import '../common/tooltip.scss';

import { useNavigate } from 'react-router-dom';
import ShareButtons from './ShareButtons';
import { useState } from 'react';


function ArticleInfo({ article, customClass='' }) {
    const [showShare, setShowShare] = useState(false)

    const { isLogged, userLogged, updateUserLogged } = useAuth();

    const isMyArticle = userLogged._id === article.usuario[0]._id;

    const isFavourite = !!userLogged.articulos?.favoritos.find(
        (myArticle) => myArticle._id === article._id
    );

    const navigate = useNavigate();
    const urlArt = `${process.env.REACT_APP_API_BASE_URL}/articles/`;

    const anadirArticuloFavourito = async () => {
        await addArticleFavorite(article._id);

        const field = {
            articulos: {
                ...userLogged.articulos,
                favoritos: isFavourite
                    ? userLogged.articulos.favoritos.filter(
                          (favouriteArticle) =>
                              favouriteArticle._id !== article._id
                      )
                    : [...userLogged.articulos.favoritos, article],
            },
        };

        updateUserLogged(field);
    };

    

    const goToResponseArticle = () => {
        navigate(`../responder/${article._id}`);
    };

    const share = () => {
        setShowShare(!showShare)
    }
    

    return (
        <div className={customClass}>
            <div className="articleInfo__container">
                <div className="articleInfo__data-wrapper">
                    <p className="data-wrapper__article-date">
                        {getMoment(article.fechaPublicacion)}
                    </p>
                </div>
                <div className="articleInfo__icons-wrapper">
                    <div className="tooltip">
                        <span className="tooltiptext">Comentarios</span>
                        <div className="comments-wrapper">
                            <FaRegComments className="comments-wrapper__icon" />
                            <p className="comments-wrapper__numComments">
                                {article.comentarios.length}
                            </p>
                        </div>
                    </div>
                    {isLogged && !isMyArticle && (
                        <>
                            {isFavourite ? (
                                <div className="tooltip">
                                    <span className="tooltiptext">Quitar de favoritos</span>
                                    <FaStar
                                        className="icons-wrapper__like"
                                        onClick={anadirArticuloFavourito}
                                    />
                                </div>
                            ) : (
                                <div className="tooltip">
                                    <span className="tooltiptext">Añadir a favoritos</span>
                                    <FaRegStar
                                        className="icons-wrapper__like"
                                        onClick={anadirArticuloFavourito}
                                    />
                                </div>
                            )}
                            <div className="tooltip">
                                <span className="tooltiptext">Responder Articulo</span>
                                <FaRegEdit  onClick={goToResponseArticle} className="icons-wrapper__edit" />
                            </div>
                        </>
                    )}
                    
                        <div className="tooltip">
                            <span className="tooltiptext">Compartir</span>
                            <FaRegPaperPlane onClick={share} className="icons-wrapper__send"></FaRegPaperPlane>
                        </div>
                </div>
            </div>
            {showShare && (
                <div className='share'>        
                <ShareButtons
                    url={urlArt + article._id}
                    titulo={article.titulo}
                    resumen={article.textoIntroductorio}
                />
            </div>
            )}
        </div>
    );
}

export default ArticleInfo;
