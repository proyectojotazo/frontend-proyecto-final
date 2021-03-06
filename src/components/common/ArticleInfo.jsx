import {
    FaRegStar,
    FaStar,
    FaRegComments,
    FaRegPaperPlane,
    FaRegEdit,
    FaTrashAlt,
    FaPencilAlt,
} from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import getMoment from '../../utils/getMoment';

import { addArticleFavorite } from '../../api/services/usuarios';
import { deleteArticle } from '../../api/services/articulos';

import './articleInfo.scss';
import '../common/tooltip.scss';

import { useNavigate } from 'react-router-dom';
import ShareButtons from './ShareButtons';
import { useState } from 'react';
import DeleteConfirm from './DeleteConfirm';

function ArticleInfo({ article, customClass = '' }) {
    const [showShare, setShowShare] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const showConfirm = () => {
        setShowDelete(!showDelete);
    };

    const { isLogged, userLogged, updateUserLogged, t } = useAuth();

    const isMyArticle = userLogged._id === article.usuario[0]._id;

    const isFavourite = !!userLogged.articulos?.favoritos.find(
        (myArticle) => myArticle._id === article._id
    );

    const navigate = useNavigate();
    const urlArt = `${process.env.REACT_APP_BASE_URL}/articles/`;

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

    const deletePost = () => {
        deleteArticle(article._id)
            .then(() => {
                const field = {
                    articulos: {
                        ...userLogged.articulos,
                        creados: userLogged.articulos.creados.filter(
                            (articulo) => articulo._id !== article._id
                        ),
                    },
                };

                updateUserLogged(field);
                navigate(`../`, { replace: true });
            })
            .catch((error) => console.log(error));
    };

    const share = () => {
        setShowShare(!showShare);
    };

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
                        <span className="tooltiptext">
                            {t('main.articleInfo.tooltipComment')}
                        </span>
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
                                    <span className="tooltiptext">
                                        {t(
                                            'main.articleInfo.tooltipRemoveFavorite'
                                        )}
                                    </span>
                                    <FaStar
                                        className="icons-wrapper__like"
                                        onClick={anadirArticuloFavourito}
                                    />
                                </div>
                            ) : (
                                <div className="tooltip">
                                    <span className="tooltiptext">
                                        {t(
                                            'main.articleInfo.tooltipAddFavorite'
                                        )}
                                    </span>
                                    <FaRegStar
                                        className="icons-wrapper__like"
                                        onClick={anadirArticuloFavourito}
                                    />
                                </div>
                            )}
                            <div className="tooltip">
                                <span className="tooltiptext">
                                    {t('main.articleInfo.tooltipResponse')}
                                </span>
                                <FaRegEdit
                                    onClick={() =>
                                        navigate(`../responder/${article._id}`)
                                    }
                                    className="icons-wrapper__edit"
                                />
                            </div>
                        </>
                    )}

                    {isMyArticle && (
                        <>
                            <div className="tooltip">
                                <span className="tooltiptext">
                                    {t('main.articleInfo.tooltipDelete')}
                                </span>
                                <FaTrashAlt
                                    onClick={showConfirm}
                                    className="icons-wrapper__edit"
                                />
                                <DeleteConfirm
                                    show={showDelete}
                                    msg={'??Quieres borrar el art??culo?'}
                                    confirm={deletePost}
                                    cancel={showConfirm}
                                />
                            </div>
                            <div className="tooltip">
                                <span className="tooltiptext">
                                    {t('main.articleInfo.tooltipEdit')}
                                </span>
                                <FaPencilAlt
                                    onClick={() =>
                                        navigate(`../editar/${article._id}`)
                                    }
                                    className="icons-wrapper__edit"
                                />
                            </div>
                        </>
                    )}

                    <div className="tooltip">
                        <span className="tooltiptext">
                            {t('main.articleInfo.tooltipShared')}
                        </span>
                        <FaRegPaperPlane
                            onClick={share}
                            className="icons-wrapper__send"
                        ></FaRegPaperPlane>
                    </div>
                </div>
            </div>
            {showShare && (
                <div className="share">
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
