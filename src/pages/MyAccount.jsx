import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { getUser } from '../api/services/auth';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import './MyAccount.scss';

function MyAccount() {
    const { dataUser } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [modificar, setModificar] = useState(false);
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setDatosUsuario({
                ...datosUsuario,
                avatar: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    useEffect(() => {
        getUser(dataUser()).then((data) => {
            const avatar = data.avatar.split('\\');
            if (avatar.length === 3) {
                data.avatar = `${process.env.REACT_APP_API_BASE_URL}/upload/${avatar[2]}`;
            } else {
                data.avatar = `${process.env.REACT_APP_API_BASE_URL}/upload/${avatar[2]}/${avatar[3]}`;
            }
            setDatosUsuario(data);
        });
    }, [dataUser]);

    console.log(datosUsuario);

    return (
        <>
            <div className="profile-content">
                <h1>Mi Cuenta</h1>
                <div className="profile-avatar">
                    <img src={datosUsuario.avatar} className="avatar" />
                </div>

                <div className="profile-sendfile">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                    />
                </div>
                <div className="profile-nick">
                    <label>Nick</label>
                    <input type="text" value={datosUsuario.nickname} disabled />
                </div>
                <div className="profile-email">
                    <label>Email</label>
                    <input type="text" value={datosUsuario.email} disabled />
                </div>
                <div className="profile-name">
                    <label>Nombre</label>
                    <input type="text" value={datosUsuario.nombre} disabled />
                </div>
                <div className="profile-lastname">
                    <label>Apellidos</label>
                    <input
                        type="text"
                        value={datosUsuario.apellidos}
                        disabled
                    />
                </div>
                <div className="profile-save">
                    <button className="save">Guardar cambios</button>
                </div>
            </div>
        </>
    );
}

export default MyAccount;
