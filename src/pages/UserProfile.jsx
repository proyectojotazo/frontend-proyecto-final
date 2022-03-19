import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/services/auth';
import MyMenuProfile from '../components/MyMenuProfile/MyMenuProfile';
import Card from '../components/common/Card';
import UserInfo from '../components/common/UserInfo';
import urlConvert from '../utils/urlConvert';

import './UserProfile.scss';

const menuOptions = ['Artículos', 'Favoritos', 'Seguidores', 'Siguiendo'];

function UserProfile() {
    const { nick } = useParams();
    const [datosPerfil, setDatosPerfil] = useState(null);
    const [election, setElection] = useState('');

    useEffect(() => {
        getUser(nick)
            .then((data) => {
                data.avatar = urlConvert(data.avatar);
                setDatosPerfil(data);
                setElection('Artículos');
            })
            .catch((error) => console.log(error));
    }, [nick]);

    const changeElection = (option) => {
        setElection(option);
    };

    console.log(datosPerfil);

    return (
        <>
            {datosPerfil && (
                <div className="user-container">
                    <div className="user-data">
                        <img
                            src={datosPerfil.avatar}
                            className="user-avatar"
                            alt="avatar"
                        />
                        <h3 className="user-nick">{datosPerfil.nickname}</h3>
                        <div className="user-info">
                            <div className="user-post">
                                <h4>{datosPerfil.articulos.creados.length}</h4>
                                <h4>Artículos</h4>
                            </div>
                            <div className="user-followers">
                                <h4>
                                    {datosPerfil.usuarios.seguidores.length}
                                </h4>
                                <h4>Seguidores</h4>
                            </div>
                            <div className="user-following">
                                <h4>{datosPerfil.usuarios.seguidos.length}</h4>
                                <h4>Siguiendo</h4>
                            </div>
                        </div>
                    </div>
                    <MyMenuProfile
                        options={menuOptions}
                        changeOption={changeElection}
                    />
                    {election === 'Artículos' && (
                        <>
                            {datosPerfil.articulos.creados.length > 0 ? (
                                datosPerfil.articulos.creados.map((art) => (
                                    <Card
                                        className="user-article"
                                        key={art._id}
                                        advert={art}
                                    />
                                ))
                            ) : (
                                <h4>{nick} aún no ha creado artículos</h4>
                            )}
                        </>
                    )}
                    {election === 'Favoritos' && (
                        <>
                            <div className="my-favourites">
                                {datosPerfil.articulos.favoritos.length > 0 ? (
                                    datosPerfil.articulos.favoritos.map(
                                        (art) => (
                                            <Card key={art._id} advert={art} />
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
                            <div className="my-followers">
                                {datosPerfil.usuarios.seguidores.length > 0 ? (
                                    datosPerfil.usuarios.seguidores.map(
                                        (user) => <UserInfo user={user} />
                                    )
                                ) : (
                                    <h4>{nick} aún no tiene seguidores</h4>
                                )}
                            </div>
                        </>
                    )}
                    {election === 'Siguiendo' && (
                        <>
                            <div className="my-followings">
                                {datosPerfil.usuarios.seguidos.length > 0 ? (
                                    datosPerfil.usuarios.seguidos.map(
                                        (user) => <UserInfo user={user} />
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
