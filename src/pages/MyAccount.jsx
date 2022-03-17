import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { getUser, userUpdate, deleteUser } from '../api/services/auth';

import './MyAccount.scss';

function MyAccount() {
    const { dataUser } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosNuevos, setDatosNuevos] = useState({});
    const [modificar, setModificar] = useState(false);
    const [nuevoPass, setNuevoPass] = useState(false);

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

    const modifyEnabled = () => {
        setModificar(!modificar);
    };

    const modifyPass = () => {
        setNuevoPass(!nuevoPass);
    };

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setDatosUsuario({
                ...datosUsuario,
                avatar: URL.createObjectURL(event.target.files[0]),
            });
            setDatosNuevos({ ...datosNuevos, avatar: event.target.files[0] });
        }
    };

    const onHandleChange = (event) => {
        setDatosNuevos({
            ...datosNuevos,
            [event.target.name]: event.target.value,
        });
    };

    const submitChanges = async () => {
        const form = new FormData();
        Object.entries(datosNuevos).forEach(([key, value]) => {
            form.append(key, value);
        });
        // console.log(form.get('nickname'));
        try {
            await userUpdate(datosUsuario._id, form);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteAccount = async () => {
        try {
            await deleteUser(datosUsuario._id);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

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
                    <input
                        type="text"
                        className="field-nick"
                        name="nickname"
                        defaultValue={datosUsuario.nickname}
                        disabled={!modificar}
                        onChange={onHandleChange}
                    />
                </div>
                <div className="profile-email">
                    <label>Email</label>
                    <input
                        type="text"
                        className="field-email"
                        name="email"
                        defaultValue={datosUsuario.email}
                        disabled={!modificar}
                        onChange={onHandleChange}
                    />
                </div>
                <div className="profile-name">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="field-name"
                        name="nombre"
                        defaultValue={datosUsuario.nombre}
                        disabled={!modificar}
                        onChange={onHandleChange}
                    />
                </div>
                <div className="profile-lastname">
                    <label>Apellidos</label>
                    <input
                        type="text"
                        className="field-lastname"
                        name="apellidos"
                        defaultValue={datosUsuario.apellidos}
                        disabled={!modificar}
                        onChange={onHandleChange}
                    />
                </div>
                {nuevoPass && (
                    <div className="profile-password">
                        <label>Nueva contraseña</label>
                        <input
                            type="password"
                            className="field-password"
                            name="password"
                            onChange={onHandleChange}
                        />
                        <label>Repetir nueva contraseña</label>
                        <input
                            type="password"
                            className="field-password"
                            name="repeat-password"
                        />
                    </div>
                )}
                <div className="profile-changepass">
                    <button
                        className="pass-button"
                        onClick={() => modifyPass()}
                    >
                        Cambiar contraseña
                    </button>
                </div>
                <div className="profile-save">
                    <button
                        className="edit-button"
                        onClick={() => modifyEnabled()}
                    >
                        Editar
                    </button>
                    <button
                        className="save-button"
                        onClick={() => submitChanges()}
                    >
                        Guardar cambios
                    </button>
                </div>
                <div className="profile-delete">
                    <button
                        className="delete-button"
                        onClick={() => deleteAccount()}
                    >
                        Eliminar cuenta
                    </button>
                </div>
            </div>
        </>
    );
}

export default MyAccount;
