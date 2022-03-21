import {
    FaRegStar,
    FaStar,
    FaRegComments,
    FaRegPaperPlane,
    FaRegEdit,
} from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import getMoment from '../../utils/getMoment';

import './articleInfo.scss';
import { getUser } from '../../api/services/auth';
import { useEffect, useState } from 'react';
import { addArticleFavorite } from '../../api/services/usuarios';

function ArticleInfo({ article }) {
    const { isLogged, dataUser } = useAuth();
    const [articuloFav, setArticuloFav] = useState('');

    // esto se quitará cuando user esté en Auth (como me comentó Javier), y todos los condicionales de user
    const [user, setUser] = useState('');
    const [propiedadArticulo, setPropiedadArticulo] = useState('');

    useEffect(() => {
        let isApiSubscribed = true;
        if (isLogged) {
            getUser(dataUser()).then((data) => {
                if (isApiSubscribed) {
                    setUser(data);
                    setPropiedadArticulo(data._id);
                    setArticuloFav(
                        articuloFavorito(data.articulos.favoritos, article)
                    );
                }
            });
        }
        return () => {
            isApiSubscribed = false;
        };
    }, [article, articuloFav, dataUser, isLogged]);

    const articuloFavorito = (usuarioArticulos, article) => {
        const articulo = usuarioArticulos.find(
            (articulo) => articulo._id === article._id
        );
        if (articulo) {
            return true;
        } else {
            return false;
        }
    };

    const anadirArticuloFavourito = async (id) => {
        await addArticleFavorite(id).then(setArticuloFav(!articuloFav));
    };

    return (
        <div className="articleInfo__container">
            <div className="articleInfo__data-wrapper">
                <p className="data-wrapper__article-date">
                    Creado {getMoment(article.fechaPublicacion)}
                </p>
            </div>
            <div className="articleInfo__icons-wrapper">
                <div className="comments-wrapper">
                    <FaRegComments className="comments-wrapper__icon" />
                    <p className="comments-wrapper__numComments">
                        {article.comentarios.length}
                    </p>
                </div>
                {/* si estas logueado, existe usuar(esto se quitará más adelante cuando usemos el contexto), y si el propietario del articulo no es el mismo que esta logueado */}
                {user && article.usuario[0]._id !== propiedadArticulo && (
                    <>
                        {articuloFav ? (
                            <FaStar
                                className="icons-wrapper__like"
                                onClick={() =>
                                    anadirArticuloFavourito(article._id)
                                }
                            />
                        ) : (
                            <FaRegStar
                                className="icons-wrapper__like"
                                onClick={() =>
                                    anadirArticuloFavourito(article._id)
                                }
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
