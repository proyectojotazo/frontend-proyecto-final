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


function ArticleInfo({ article }) {
    const { isLogged, userLogged, updateUserLogged } = useAuth();

    const isMyArticle = userLogged._id === article.usuario[0]._id;

    const isFavourite = !!userLogged.articulos?.favoritos.find(
        (myArticle) => myArticle._id === article._id
    );

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

    return (
        <div className="articleInfo__container">
            <div className="articleInfo__data-wrapper">
                <p className="data-wrapper__article-date">
                    {getMoment(article.fechaPublicacion)}
                </p>
            </div>
            <div className="articleInfo__icons-wrapper">
                <div className="comments-wrapper">
                    <FaRegComments className="comments-wrapper__icon" />
                    <p className="comments-wrapper__numComments">
                        {article.comentarios.length}
                    </p>
                </div>
                {isLogged && !isMyArticle && (
                    <>
                        {isFavourite ? (
                            <FaStar
                                className="icons-wrapper__like"
                                onClick={anadirArticuloFavourito}
                            />
                        ) : (
                            <FaRegStar
                                className="icons-wrapper__like"
                                onClick={anadirArticuloFavourito}
                            />
                        )}
                        <FaRegEdit className="icons-wrapper__edit" />
                    </>
                )}
                <FaRegPaperPlane className="icons-wrapper__send" />
            </div>
        </div>
    );
}

export default ArticleInfo;
