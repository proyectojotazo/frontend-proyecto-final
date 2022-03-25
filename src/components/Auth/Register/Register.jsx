import React, { useState } from 'react';

import { register as registerService } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { ReactComponent as Usuario } from '../../../assets/usuario.svg';
import './register.scss';

const Register = () => {
    const initialState = {
        nombre: '',
        apellidos: '',
        email: '',
        nickname: '',
        password: '',
        repeatPassword: '',
    };

    const [userData, setUserData] = useState(initialState);
    const [registerSucces, setRegisterSucces] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
        clearErrors(name);
        clearErrors('custom');
    };

    const handleRegister = () => {
        registerService(userData)
            .then((data) => {
                setRegisterSucces(true);
            })
            .catch((err) => {
                if (err.email) {
                    setError('email', {
                        type: 'manual',
                        message: err.email.message,
                    });
                }

                if (err.nickname) {
                    setError('nickname', {
                        type: 'manual',
                        message: err.nickname.message,
                    });
                }
            });
    };

    return (
        <div>
            {registerSucces ? (
                <div className="succes-message">
                    <h2>Bienvenid@ a la comunidad de El Ultimo y me voy</h2>
                </div>
            ) : (
                <div>
                    {' '}
                    <div className="header-login-container">
                        <Usuario className="icon icon-usuario" />
                        <h3 className="header-login-title">Regístrate</h3>
                    </div>
                    <div className="login-form-container">
                        <form
                            noValidate
                            onSubmit={handleSubmit(handleRegister)}
                        >
                            <div className="input-container">
                                <input
                                    {...register('name', {
                                        required: 'Introduce tu nombre',
                                        pattern: {
                                            value: /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)(([\s-]){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)?$/i,
                                            message:
                                                'El nombre tiene carácteres no válidos',
                                        },
                                    })}
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                    placeholder="Nombre"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => (
                                        <p className="form-custom-error">
                                            {message}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    {...register('apellidos', {
                                        required: 'Introduce tus apellidos',
                                        pattern: {
                                            value: /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)(([\s-]){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)?$/i,
                                            message:
                                                'Los apellidos tienen carácteres no válidos',
                                        },
                                    })}
                                    type="text"
                                    name="apellidos"
                                    id="apellidos"
                                    onChange={handleInputChange}
                                    placeholder="Apellidos"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="apellidos"
                                    render={({ message }) => (
                                        <p className="form-custom-error">
                                            {message}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    {...register('email', {
                                        required:
                                            'Introduce tu correo electrònico',
                                        pattern: {
                                            value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                                            message:
                                                'Tienes que introducir un correo electrònico',
                                        },
                                    })}
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="email"
                                    render={({ message }) => (
                                        <p className="form-custom-error">
                                            {message}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    {...register('nickname', {
                                        required: 'Introduce tu nickname',
                                    })}
                                    type="text"
                                    name="nickname"
                                    id="nickname"
                                    onChange={handleInputChange}
                                    placeholder="Nickname"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="nickname"
                                    render={({ message }) => (
                                        <p className="form-custom-error">
                                            {message}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    {...register('password', {
                                        required: 'Introduce tu contraseña',
                                        pattern: {
                                            value: /^(?=.*[a-zÀ-ÿ\u00f1\u00d1])(?=.*[A-ZÀ-ÿ\u00f1\u00d1])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zÀ-ÿ\u00f1\u00d1\d@$!%*?&\-_]{8,}$/,
                                            message:
                                                'Mínimo 8 carácteres con 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial de los siguientes: @$!%*?&-_',
                                        },
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleInputChange}
                                    placeholder="Contraseña"
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="password"
                                    render={({ message }) => (
                                        <p className="form-custom-error">
                                            {message}
                                        </p>
                                    )}
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    {...register('repeatPassword', {
                                        required: 'Introduce tu contraseña',
                                        validate: {
                                            repeatPwd: (value) =>
                                                value === userData.password,
                                        },
                                    })}
                                    type="password"
                                    name="repeatPassword"
                                    id="repeatPassword"
                                    onChange={handleInputChange}
                                    placeholder="Repite tu contraseña"
                                />
                                {errors.repeatPassword &&
                                    errors.repeatPassword.type ===
                                        'repeatPwd' && (
                                        <p className="form-custom-error">
                                            Tus contraseñas no coinciden
                                        </p>
                                    )}
                            </div>
                            <input
                                type="submit"
                                value="Regístrate"
                                className="login-submit-button"
                            />
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;
