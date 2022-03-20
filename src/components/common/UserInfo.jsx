import { useNavigate } from 'react-router-dom';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import './userInfo.scss';

const parseAvatar = (url) => {
    return `${process.env.REACT_APP_API_BASE_URL}/${url.replace(
        'public\\',
        ''
    )}`.replaceAll('\\', '/');
};

function UserInfo({ user }) {
    const { isLogged, dataUser } = useAuth();

    const navigate = useNavigate();

    const handleFollow = (e) => {
        e.stopPropagation();
        // Si no se está logeado que muestre un pop-up para loguearse?
        console.log('Siguiendo');
        // Si está logueado que lo agregue a seguidos
    };

    const goToUserProfile = () => {
        navigate(`../user/${user.nickname}`);
    };

    const sameUser = user._id === dataUser();

    return (
        <div onClick={goToUserProfile} className="userInfo__container">
            <div className="userInfo__img-wrapper">
                <img src={parseAvatar(user.avatar)} alt="avatar" />
            </div>
            <p className="userInfo__nickname">{user.nickname}</p>
            {isLogged && (
                <button
                    onClick={handleFollow}
                    className={`userInfo__btn-follow ${sameUser && 'hidden'}`}
                >
                    Seguir <FaRegHeart />
                </button>
            )}
        </div>
    );
}

export default UserInfo;
