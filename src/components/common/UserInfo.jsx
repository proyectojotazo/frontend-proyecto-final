import './userInfo.scss';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

const parseAvatar = (url) => {
    return `${process.env.REACT_APP_API_BASE_URL}/${url.replace(
        'public\\',
        ''
    )}`.replaceAll('\\', '/');
};

function UserInfo({ user }) {
    const addFavourite = () => {};
    return (
        <div className="userInfo__container">
            <div className="userInfo__img-wrapper">
                <img src={parseAvatar(user.avatar)} alt="avatar" />
            </div>
            <p className="userInfo__nickname">{user.nickname}</p>
            <button onClick={addFavourite} className="userInfo__btn-follow">
                Seguir <FaRegHeart />
            </button>
        </div>
    );
}

export default UserInfo;
