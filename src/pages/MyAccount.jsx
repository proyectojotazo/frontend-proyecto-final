import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { getUser, userUpdate, deleteUser } from '../api/services/auth';
import MenuProfile from '../components/MenuProfile/MenuProfile';
import Card from '../components/common/Card';
import UserInfo from '../components/common/UserInfo';
import Spinner from '../components/common/Spinner';
import urlConvert from '../utils/urlConvert';

import DeleteConfirm from '../components/common/DeleteConfirm';

import './MyAccount.scss';

const menuOptions = [
    'Mi Perfil',
    'Mis Artículos',
    'Favoritos',
    'Seguidores',
    'Seguidos',
];

function MyAccount() {
    const { dataUser, t } = useAuth();
    const [datosUsuario, setDatosUsuario] = useState([]);
    const [datosNuevos, setDatosNuevos] = useState({});
    const [modificar, setModificar] = useState(false);
    const [nuevoPass, setNuevoPass] = useState(false);
    const [election, setElection] = useState('Mi Perfil');
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        getUser(dataUser())
            .then((data) => {
                data.avatar = urlConvert(data.avatar);
                setDatosUsuario(data);
            })
            .catch((error) => console.log(error))
            .finally(setLoading(false));
    }, [dataUser]);

    const changeElection = (option) => {
        setElection(option);
    };

    const modifyEnabled = () => {
        setModificar(!modificar);
    };

    const modifyPass = () => {
        setNuevoPass(!nuevoPass);
    };

    const comparePassword = (e) => {
        const msg = t("main.myAccount.passwordNot");
        const value = e.target.value;
        setErrors({
            ...errors,
            repeatPassword: datosNuevos.password !== value ? msg : '',
        });
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

        try {
            if (!errors.repeatPassword) {
                await userUpdate(datosUsuario._id, form);
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            setErrors(error);
        }
    };

    const showConfirm = () => {
        setShowDelete(!showDelete);
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
            {loading && <Spinner />}
            <div className="profile-content">
                <h1 className="profile-title">&lt;{t("main.myAccount.myAccount")}&gt;</h1>
                <MenuProfile
                    className="profile-menu"
                    options={menuOptions}
                    changeOption={changeElection}
                />
                <div className="my-profile">
                    {election === 'Mi Perfil' && (
                        <>
                            <div className="profile-avatar">
                                <img
                                    src={datosUsuario.avatar}
                                    className="avatar"
                                    alt="avatar"
                                />
                                <div className="profile-sendfile">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={onImageChange}
                                    />
                                </div>
                            </div>

                            <div className="profile-nick">
                                <label>{t("common.nickname")}</label>
                                <input
                                    type="text"
                                    className="field-nick"
                                    name="nickname"
                                    defaultValue={datosUsuario.nickname}
                                    disabled={!modificar}
                                    onChange={onHandleChange}
                                />
                                {errors.nickname && (
                                    <label className="error-msg">
                                        {errors.nickname.message}
                                    </label>
                                )}
                            </div>
                            <div className="profile-email">
                                <label>{t("common.email")}</label>
                                <input
                                    type="text"
                                    className="field-email"
                                    name="email"
                                    defaultValue={datosUsuario.email}
                                    disabled={!modificar}
                                    onChange={onHandleChange}
                                />
                                {errors.email && (
                                    <label className="error-msg">
                                        {errors.email.message}
                                    </label>
                                )}
                            </div>
                            <div className="profile-name">
                                <label>{t("common.name")}</label>
                                <input
                                    type="text"
                                    className="field-name"
                                    name="nombre"
                                    defaultValue={datosUsuario.nombre}
                                    disabled={!modificar}
                                    onChange={onHandleChange}
                                />
                                {errors.nombre && (
                                    <label className="error-msg">
                                        {errors.nombre.message}
                                    </label>
                                )}
                            </div>
                            <div className="profile-lastname">
                                <label>{t("common.surname")}</label>
                                <input
                                    type="text"
                                    className="field-lastname"
                                    name="apellidos"
                                    defaultValue={datosUsuario.apellidos}
                                    disabled={!modificar}
                                    onChange={onHandleChange}
                                />
                                {errors.apellidos && (
                                    <label className="error-msg">
                                        {errors.apellidos.message}
                                    </label>
                                )}
                            </div>
                            {nuevoPass && (
                                <div className="profile-password">
                                    <label>{t("main.myAccount.passwordNew")}</label>
                                    <input
                                        type="password"
                                        className="field-password"
                                        name="password"
                                        onChange={onHandleChange}
                                    />
                                    {errors.password && (
                                        <label className="error-msg">
                                            {errors.password.message}
                                        </label>
                                    )}
                                    <label>{t("main.myAccount.RepeatpasswordNew")}</label>
                                    <input
                                        type="password"
                                        className="field-password"
                                        name="repeat-password"
                                        onChange={comparePassword}
                                    />
                                    {errors.repeatPassword && (
                                        <label className="error-msg">
                                            {errors.repeatPassword}
                                        </label>
                                    )}
                                </div>
                            )}
                            <div className="profile-changepass">
                                <button
                                    className="pass-button"
                                    onClick={() => modifyPass()}
                                >
                                    {t("main.myAccount.changePassword")}
                                </button>
                            </div>
                            <div className="profile-save">
                                <button
                                    className="edit-button"
                                    onClick={() => modifyEnabled()}
                                >
                                    {t("common.edit")}
                                </button>
                                <button
                                    className="save-button"
                                    onClick={() => submitChanges()}
                                >
                                    {t("common.save")}
                                </button>
                            </div>
                            <div className="profile-delete">
                                <button
                                    className="delete-button"
                                    onClick={() => showConfirm()}
                                >
                                    {t("main.myAccount.removeAccount")}
                                </button>
                                <DeleteConfirm
                                    show={showDelete}
                                    msg={t("main.myAccount.deleteConf")}
                                    confirm={deleteAccount}
                                    cancel={showConfirm}
                                />
                            </div>
                        </>
                    )}
                </div>
                {election === 'Mis Artículos' && (
                    <>
                        <div className="my-articles">
                            {datosUsuario.articulos.creados.length > 0 ? (
                                datosUsuario.articulos.creados.map((art) => (
                                    <Card
                                        className="my-article"
                                        key={art._id}
                                        articulo={art}
                                    />
                                ))
                            ) : (
                                <h4>{t("main.myAccount.notArticle")}</h4>
                            )}
                        </div>
                    </>
                )}
                {election === 'Favoritos' && (
                    <>
                        <div className="my-favourites">
                            {datosUsuario.articulos.favoritos.length > 0 ? (
                                datosUsuario.articulos.favoritos.map((art) => (
                                    <Card key={art._id} articulo={art} />
                                ))
                            ) : (
                                <h4>{t("main.myAccount.notFavouritesArticles")}</h4>
                            )}
                        </div>
                    </>
                )}
                {election === 'Seguidores' && (
                    <>
                        <div className="my-followers">
                            {datosUsuario.usuarios.seguidores.length > 0 ? (
                                datosUsuario.usuarios.seguidores.map((user) => (
                                    <UserInfo key={user._id} user={user} />
                                ))
                            ) : (
                                <h4>Aún no te sigue ningún usuario</h4>
                            )}
                        </div>
                    </>
                )}
                {election === 'Seguidos' && (
                    <>
                        <div className="my-followings">
                            {datosUsuario.usuarios.seguidos.length > 0 ? (
                                datosUsuario.usuarios.seguidos.map((user) => (
                                    <UserInfo key={user._id} user={user} />
                                ))
                            ) : (
                                <h4>{t("main.myAccount.notFollowers")}</h4>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default MyAccount;
