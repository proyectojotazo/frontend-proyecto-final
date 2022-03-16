import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { getUser } from '../api/services/auth';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

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

    useEffect(() => {
        getUser(dataUser()).then((data) => {
            setDatosUsuario({ ...data, avatar: data.avatar.split('\\')[2] });
        });
    }, [dataUser]);

    console.log(datosUsuario);

    return (
        <>
            <div>
                <h1>Mi Cuenta</h1>
                <img
                    src={`${process.env.REACT_APP_API_BASE_URL}/upload/${datosUsuario.avatar}`}
                />
                <label>Nick</label>
                <input type="text" value={datosUsuario.nickname} disabled />
                <label>Email</label>
                <input type="text" value={datosUsuario.email} disabled />
                <label>Nombre</label>
                <input type="text" value={datosUsuario.nombre} disabled />
                <label>Apellidos</label>
                <input type="text" value={datosUsuario.apellidos} disabled />
            </div>
        </>
    );
}

export default MyAccount;
