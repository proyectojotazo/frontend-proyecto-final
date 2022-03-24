import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SweetAlert2 from 'react-sweetalert2';

import Card from '../components/common/Card';
import UserInfo from '../components/common/UserInfo';
import Popup from '../components/Auth/Popup/PopUp';
import MenuProfile from '../components/MenuProfile/MenuProfile';
import Spinner from '../components/common/Spinner';

import urlConvert from '../utils/urlConvert';
import { getUser } from '../api/services/auth';
import { followUser } from '../api/services/usuarios';
import { useAuth } from './../contexts/authContext';

import './UserProfile.scss';

const menuOptions = ['Artículos', 'Favoritos', 'Seguidores', 'Siguiendo'];

function UserProfile() {
    const { nick } = useParams();
    const navigate = useNavigate();
    const { isLogged, userLogged, updateUserLogged } = useAuth();
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [election, setElection] = useState('Artículos');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);

    const isFollowing = datosPerfil?.usuarios.seguidores.find(
        (user) => user._id === userLogged._id
    );
    const isMe = datosPerfil?._id === userLogged?._id;

    useEffect(() => {
        let isApiSubscribed = true;
        getUser(nick)
            .then((data) => {
                if (isApiSubscribed) {
                    setDatosPerfil(data);
                }
            })
            .catch((error) => console.log(error))
            .finally(setLoading(false));
        return () => {
            isApiSubscribed = false;
        };
    }, [nick]);

    const changeElection = (option) => {
        setElection(option);
    };

    const handleShowLogin = () => {
        setShowPopup({
            show: true,
            showConfirmButton: false,
            showCloseButton: true,
        });
    };

    const handleFollow = async () => {
        if (isMe) navigate('../my-account');

        await followUser(datosPerfil._id);

        const following = {
            usuarios: {
                seguidores: [...userLogged.usuarios.seguidores],
                seguidos: isFollowing
                    ? userLogged.usuarios.seguidos.filter(
                          (userFollowed) => userFollowed._id !== datosPerfil._id
                      )
                    : [...userLogged.usuarios.seguidos, datosPerfil],
            },
        };

        updateUserLogged(following);

        setDatosPerfil((prev) => ({
            ...prev,
            usuarios: {
                ...prev.usuarios,
                seguidores: isFollowing
                    ? prev.usuarios.seguidores.filter(
                          (userFollower) => userFollower._id !== userLogged._id
                      )
                    : [...prev.usuarios.seguidores, userLogged],
            },
        }));
    };

    return (
        <>
            {loading && <Spinner />}
            {datosPerfil && (
                <div className="user-container">
                    <div className="user-data">
                        <img
                            src={urlConvert(datosPerfil.avatar)}
                            className="user-avatar"
                            alt="avatar"
                        />
                        <h3 className="user-nick">{datosPerfil.nickname}</h3>
                        <div className="user-info">
                            <div className="num-post">
                                <h4>{datosPerfil.articulos.creados.length}</h4>
                                <h4>Artículos</h4>
                            </div>
                            <div className="num-followers">
                                <h4>
                                    {datosPerfil.usuarios.seguidores.length}
                                </h4>
                                <h4>Seguidores</h4>
                            </div>
                            <div className="num-following">
                                <h4>{datosPerfil.usuarios.seguidos.length}</h4>
                                <h4>Siguiendo</h4>
                            </div>
                            <div className="follow-container">
                                {!isLogged ? (
                                    <button
                                        className="login-button"
                                        onClick={handleShowLogin}
                                    >
                                        Debes iniciar sesión para seguir al
                                        usuario
                                    </button>
                                ) : (
                                    <button
                                        className="follow-button"
                                        onClick={handleFollow}
                                    >
                                        {isMe
                                            ? 'Editar Perfil'
                                            : isFollowing
                                            ? 'Dejar de seguir'
                                            : 'Seguir'}
                                    </button>
                                )}
                                <SweetAlert2
                                    {...showPopup}
                                    didClose={() => {
                                        setShowPopup({
                                            show: false,
                                        });
                                    }}
                                >
                                    <Popup />
                                </SweetAlert2>
                            </div>
                        </div>
                    </div>
                    <MenuProfile
                        options={menuOptions}
                        changeOption={changeElection}
                    />
                    {election === 'Artículos' && (
                        <>
                            <div className="user-articles">
                                {datosPerfil.articulos.creados.length > 0 ? (
                                    datosPerfil.articulos.creados.map((art) => (
                                        <Card
                                            className="user-article"
                                            key={art._id}
                                            articulo={art}
                                        />
                                    ))
                                ) : (
                                    <h4>{nick} aún no ha creado artículos</h4>
                                )}
                            </div>
                        </>
                    )}
                    {election === 'Favoritos' && (
                        <>
                            <div className="user-favourites">
                                {datosPerfil.articulos.favoritos.length > 0 ? (
                                    datosPerfil.articulos.favoritos.map(
                                        (art) => (
                                            <Card
                                                key={art._id}
                                                articulo={art}
                                            />
                                        )
                                    )
                                ) : (
                                    <h4>
                                        {nick} aún no ha añadido artículos
                                        favoritos
                                    </h4>
                                )}
                            </div>
                        </>
                    )}
                    {election === 'Seguidores' && (
                        <>
                            <div className="user-followers">
                                {datosPerfil.usuarios.seguidores.length > 0 ? (
                                    datosPerfil.usuarios.seguidores.map(
                                        (user) => (
                                            <UserInfo
                                                key={user._id}
                                                user={user}
                                            />
                                        )
                                    )
                                ) : (
                                    <h4>{nick} aún no tiene seguidores</h4>
                                )}
                            </div>
                        </>
                    )}
                    {election === 'Siguiendo' && (
                        <>
                            <div className="user-followings">
                                {datosPerfil.usuarios.seguidos.length > 0 ? (
                                    datosPerfil.usuarios.seguidos.map(
                                        (user) => (
                                            <UserInfo
                                                key={user._id}
                                                user={user}
                                            />
                                        )
                                    )
                                ) : (
                                    <h4>
                                        {nick} aún no sigue a ningún usuario
                                    </h4>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
}

export default UserProfile;
