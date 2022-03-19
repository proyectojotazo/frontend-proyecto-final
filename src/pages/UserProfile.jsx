import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../api/services/auth';
import MyMenuProfile from '../components/MyMenuProfile/MyMenuProfile';
import Card from '../components/common/Card';
import UserInfo from '../components/common/UserInfo';

import './UserProfile.scss';

function UserProfile() {
    const { nick } = useParams();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [election, setElection] = useState('');

    useEffect(() => {
        getUser(nick).then((data) => {
            setDatosUsuario(data);
        });
    }, [nick]);

    const changeElection = (option) => {
        setElection(option);
    };

    console.log(datosUsuario);

    return (
        <>
            <div className="user-container">
                {datosUsuario && <UserInfo user={datosUsuario} />}
                <MyMenuProfile changeOption={changeElection} />
                {election === 'Artículos' && (
                    <>
                        {datosUsuario.articulos.creados.length > 0 ? (
                            datosUsuario.articulos.creados.map((art) => (
                                <Card
                                    className="user-article"
                                    key={art._id}
                                    advert={art}
                                />
                            ))
                        ) : (
                            <h4>El usuario aún no ha creado artículos</h4>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default UserProfile;
