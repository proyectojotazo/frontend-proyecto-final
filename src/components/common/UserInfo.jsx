import { useNavigate } from 'react-router-dom';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import { followUser } from '../../api/services/usuarios';

import urlConvert from '../../utils/urlConvert';

import './userInfo.scss';

function UserInfo({ user }) {
    const { isLogged, userLogged, updateUserLogged } = useAuth();
    
    const isFollowing = userLogged.usuarios?.seguidos.find(
        (userFollowed) => userFollowed._id === user._id
    );

    const navigate = useNavigate();

    const handleFollow = async (e) => {
        e.stopPropagation();
        // Si no se está logeado que muestre un pop-up para loguearse?

        // Si está logueado que lo agregue a seguidos
        await followUser(user._id);

        const following = {
            usuarios: {
                seguidores: [...userLogged.usuarios.seguidores],
                seguidos: isFollowing
                    ? userLogged.usuarios.seguidos.filter(
                          (userFollowed) => userFollowed._id !== user._id
                      )
                    : [...userLogged.usuarios.seguidos, user],
            },
        };

        updateUserLogged(following);
    };

    const goToUserProfile = () => {
        navigate(`../user/${user.nickname}`);
    };

    const sameUser = user._id === userLogged._id;

    return (
        <div onClick={goToUserProfile} className="userInfo__container">
            <div className="userInfo__img-wrapper">
                <img src={urlConvert(user.avatar)} alt="avatar" />
            </div>
            <p className="userInfo__nickname">{user.nickname}</p>
            {isLogged && (
                <button
                    onClick={handleFollow}
                    className={`userInfo__btn-follow ${sameUser && 'hidden'}`}
                >
                    {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                    {isFollowing ? <FaHeart /> : <FaRegHeart />}
                </button>
            )}
        </div>
    );
}

export default UserInfo;
