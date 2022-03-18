import moment from 'moment';
import {
    FaRegHeart,
    FaRegComments,
    FaRegPaperPlane,
    FaRegEdit,
} from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import './articleInfo.scss';

const getMoment = (date) => {
    return moment(date).startOf('seconds').fromNow();
};

function ArticleInfo({ article }) {
    const { isLogged } = useAuth();
    return (
        <div className="articleInfo__container">
            <div className="articleInfo__data-wrapper">
                <p className="data-wrapper__article-date">
                    Created {getMoment(article.fechaPublicacion)}
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
