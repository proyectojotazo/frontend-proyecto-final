import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/services/auth';
import MyMenuProfile from '../components/MyMenuProfile/MyMenuProfile';
import Card from '../components/common/Card';
import UserInfo from '../components/common/UserInfo';

import './UserProfile.scss';

const menuOptions = ['Artículos', 'Favoritos', 'Seguidores', 'Seguidos'];

function UserProfile() {
    const { nick } = useParams();
    const [datosPerfil, setDatosPerfil] = useState([]);
    const [election, setElection] = useState('');

    useEffect(() => {
        getUser(nick).then((data) => {
            setDatosPerfil(data);
            setElection('Artículos');
        });
    }, [nick]);

    const changeElection = (option) => {
        setElection(option);
    };

    console.log(datosPerfil);

    return (
        <>
            <div className="user-container">
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
                                datosPerfil.articulos.favoritos.map((art) => (
                                    <Card key={art._id} advert={art} />
                                ))
                            ) : (
                                <h4>
                                    {nick} aún no ha añadido artículos favoritos
                                </h4>
                            )}
                        </div>
                    </>
                )}
                {election === 'Seguidores' && (
                    <>
                        <div className="my-followers">
                            {datosPerfil.usuarios.seguidores.length > 0 ? (
                                datosPerfil.usuarios.seguidores.map((user) => (
                                    <UserInfo user={user} />
                                ))
                            ) : (
                                <h4>{nick} aún no tiene seguidores</h4>
                            )}
                        </div>
                    </>
                )}
                {election === 'Seguidos' && (
                    <>
                        <div className="my-followings">
                            {datosPerfil.usuarios.seguidos.length > 0 ? (
                                datosPerfil.usuarios.seguidos.map((user) => (
                                    <UserInfo user={user} />
                                ))
                            ) : (
                                <h4>{nick} aún no sigue a ningún usuario</h4>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default UserProfile;
