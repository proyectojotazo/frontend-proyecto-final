import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { getUser } from '../../api/services/auth';
import { followUser } from '../../api/services/usuarios';

import './FollowButton.scss';

function FollowButton({ userNick, userId }) {
    const { isLogged, dataUser } = useAuth();
    const [nick, setNick] = useState('');
    const [siguiendo, setSiguiendo] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        isLogged &&
            getUser(dataUser()).then((data) => {
                data.usuarios.seguidos.forEach((user) => {
                    user.nickname === userNick && setSiguiendo(true);
                });
                setNick(data.nickname);
            });
    }, [dataUser, isLogged, userNick]);

    const goToMyAccount = () => {
        navigate('../my-account');
    };

    const followOrUnfollow = async () => {
        try {
            await followUser(userId);
            setSiguiendo(!siguiendo);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="follow-button">
                {isLogged ? (
                    <>
                        {nick === userNick ? (
                            <button onClick={goToMyAccount}>
                                Editar Perfil
                            </button>
                        ) : (
                            <>
                                {!siguiendo ? (
                                    <button onClick={followOrUnfollow}>
                                        Seguir
                                    </button>
                                ) : (
                                    <button onClick={followOrUnfollow}>
                                        Dejar de seguir
                                    </button>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <h4>Debes iniciar sesión para seguir al usuario</h4>
                )}
            </div>
        </>
    );
}

export default FollowButton;
