import {
    FaRegHeart,
    FaRegComments,
    FaRegPaperPlane,
    FaRegEdit,
} from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import getMoment from '../../utils/getMoment';

import './articleInfo.scss';


function ArticleInfo({ article }) {
    const { isLogged } = useAuth();
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
                {isLogged && (
                    <>
                        <FaRegHeart className="icons-wrapper__like" />
                        <FaRegEdit className="icons-wrapper__edit" />
                    </>
                )}
                <FaRegPaperPlane className="icons-wrapper__send" />
            </div>
        </div>
    );
}

export default ArticleInfo;
