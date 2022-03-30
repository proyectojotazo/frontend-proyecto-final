import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
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

function UserProfile() {
    const { nick } = useParams();
    const navigate = useNavigate();
    const { isLogged, userLogged, updateUserLogged, t } = useAuth();
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [election, setElection] = useState(t('common.articles'));
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(true);

    const menuOptions = [
        t('common.articles'),
        t('common.menuOptions.favourites'),
        t('common.followers'),
        t('common.follow'),
    ];

    const isFollowing = datosPerfil?.usuarios.seguidores.find(
        (user) => user._id === userLogged._id
    );
    const isMe = datosPerfil?._id === userLogged?._id;

    useEffect(() => {
        setElection(t('common.articles'));
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
    }, [nick, t]);

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
                <>
                    <Helmet>
                        <title>
                            {datosPerfil.nickname} | El Último & Me Voy
                        </title>
                        <meta
                            name="description"
                            content="Blog sobre Desarrollo Web creado como proyecto final del Bootcamp Full Stack Web Developer de KeepCoding"
                        />
                    </Helmet>
                    <div className="user-container">
                        <div className="user-data">
                            <img
                                src={urlConvert(datosPerfil.avatar)}
                                className="user-avatar"
                                alt="avatar"
                            />
                            <h3 className="user-nick">
                                {datosPerfil.nickname}
                            </h3>
                            <div className="user-info">
                                <div className="num-post">
                                    <h4>
                                        {datosPerfil.articulos.creados.length}
                                    </h4>
                                    <h4>{t('common.articles')}</h4>
                                </div>
                                <div className="num-followers">
                                    <h4>
                                        {datosPerfil.usuarios.seguidores.length}
                                    </h4>
                                    <h4>{t('common.followers')}</h4>
                                </div>
                                <div className="num-following">
                                    <h4>
                                        {datosPerfil.usuarios.seguidos.length}
                                    </h4>
                                    <h4>{t('common.follow')}</h4>
                                </div>
                                <div className="follow-container">
                                    {!isLogged ? (
                                        <button
                                            className="login-button"
                                            onClick={handleShowLogin}
                                        >
                                            {t('main.userProfile.notLoggin')}
                                        </button>
                                    ) : (
                                        <button
                                            className="follow-button"
                                            onClick={handleFollow}
                                        >
                                            {isMe
                                                ? t(
                                                      'main.userProfile.editProfile'
                                                  )
                                                : isFollowing
                                                ? t('main.userProfile.unFollow')
                                                : t('main.userProfile.follow')}
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
                        {election === t('common.articles') && (
                            <>
                                <div className="user-articles">
                                    {datosPerfil.articulos.creados.length >
                                    0 ? (
                                        datosPerfil.articulos.creados.map(
                                            (art) => (
                                                <Card
                                                    className="user-article"
                                                    key={art._id}
                                                    articulo={art}
                                                />
                                            )
                                        )
                                    ) : (
                                        <h4>
                                            {nick}{' '}
                                            {t('main.userProfile.notArticle')}
                                        </h4>
                                    )}
                                </div>
                            </>
                        )}
                        {election === t('common.menuOptions.favourites') && (
                            <>
                                <div className="user-favourites">
                                    {datosPerfil.articulos.favoritos.length >
                                    0 ? (
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
                                            {nick}{' '}
                                            {t(
                                                'main.userProfile.notFavourites'
                                            )}
                                        </h4>
                                    )}
                                </div>
                            </>
                        )}
                        {election === t('common.followers') && (
                            <>
                                <div className="user-followers">
                                    {datosPerfil.usuarios.seguidores.length >
                                    0 ? (
                                        datosPerfil.usuarios.seguidores.map(
                                            (user) => (
                                                <UserInfo
                                                    key={user._id}
                                                    user={user}
                                                />
                                            )
                                        )
                                    ) : (
                                        <h4>
                                            {nick}{' '}
                                            {t('main.userProfile.notFollowers')}
                                        </h4>
                                    )}
                                </div>
                            </>
                        )}
                        {election === t('common.follow') && (
                            <>
                                <div className="user-followings">
                                    {datosPerfil.usuarios.seguidos.length >
                                    0 ? (
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
                                            {nick}{' '}
                                            {t('main.userProfile.notFollow')}
                                        </h4>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default UserProfile;
