import { useNavigate } from 'react-router-dom';

import { FaRegHeart, FaHeart } from 'react-icons/fa';

import { useAuth } from './../../contexts/authContext';

import { followUser } from '../../api/services/usuarios';

import './userInfo.scss';

const parseAvatar = (url) => {
    return `${process.env.REACT_APP_API_BASE_URL}/${url.replace(
        'public\\',
        ''
    )}`.replaceAll('\\', '/');
};

function UserInfo({ user }) {
    const { isLogged, dataUser } = useAuth();
    // const [currentFollowers, setCurrentFollowers] = useState(
    //     user.usuarios.seguidores
    // );

    const isFollowing = !!user.usuarios.seguidores.find(
        (idFollower) => idFollower === dataUser()
    );

    const navigate = useNavigate();

    const handleFollow = async (e) => {
        e.stopPropagation();
        // Si no se está logeado que muestre un pop-up para loguearse?

        // Si está logueado que lo agregue a seguidos
        await followUser(user._id);
        // if (!isFollowing) setCurrentFollowers((prev) => [...prev, dataUser()]);
        // else
        //     setCurrentFollowers((prev) =>
        //         prev.filter((followerId) => followerId !== dataUser())
        //     );
        window.location.reload()
        
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
                    {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                    {isFollowing ? <FaHeart /> : <FaRegHeart />}
                </button>
            )}
        </div>
    );
}

export default UserInfo;
