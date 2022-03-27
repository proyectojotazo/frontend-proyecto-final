import React, { useState } from 'react';

import { register as registerService } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Usuario } from '../../../assets/icons';
import './register.scss';
import { useAuth } from '../../../contexts/authContext';

const Register = () => {
    const { t } = useAuth();
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
                    <h2>{t('nav.register.succesMessage')}</h2>
                </div>
            ) : (
                <div>
                    {' '}
                    <div className="header-login-container">
                        <Usuario className="icon icon-usuario" />
                        <h3 className="header-login-title">{t('nav.register.title')}</h3>
                    </div>
                    <div className="login-form-container">
                        <form
                            noValidate
                            onSubmit={handleSubmit(handleRegister)}
                        >
                            <div className="input-container">
                                <input
                                    {...register('name', {
                                        required: t("common.required.name"),
                                        pattern: {
                                            value: /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)(([\s-]){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)?$/i,
                                            message:
                                            t("common.required.nameError"),
                                        },
                                    })}
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={handleInputChange}
                                    placeholder={t('common.name')}
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
                                        required: t("common.required.surname"),
                                        pattern: {
                                            value: /^([a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)(([\s-]){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,}(([']){1}[a-zA-ZÀ-ÿ\u00f1\u00d1]{1,})?)?$/i,
                                            message:
                                            t("common.required.surnameError"),
                                        },
                                    })}
                                    type="text"
                                    name="apellidos"
                                    id="apellidos"
                                    onChange={handleInputChange}
                                    placeholder={t('common.surname')}
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
                                            t('nav.login.emailMessage'),
                                        pattern: {
                                            value: /^([a-zA-Z0-9_\-\\.]+)@([a-zA-Z0-9_\-\\.]+)\.([a-zA-Z]{2,5})$/,
                                            message:
                                            t('nav.login.emailMessage'),
                                        },
                                    })}
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={handleInputChange}
                                    placeholder={t('common.email')}
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
                                        required: t("common.required.nickname"),
                                    })}
                                    type="text"
                                    name="nickname"
                                    id="nickname"
                                    onChange={handleInputChange}
                                    placeholder={t('common.nickname')}
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
                                        required: t('common.required.password'),
                                        pattern: {
                                            value: /^(?=.*[a-zÀ-ÿ\u00f1\u00d1])(?=.*[A-ZÀ-ÿ\u00f1\u00d1])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zÀ-ÿ\u00f1\u00d1\d@$!%*?&\-_]{8,}$/,
                                            message:
                                            t('common.required.passwordError'),
                                        },
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={handleInputChange}
                                    placeholder={t('common.password')}
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
                                        required: t("common.required.password"),
                                        validate: {
                                            repeatPwd: (value) =>
                                                value === userData.password,
                                        },
                                    })}
                                    type="password"
                                    name="repeatPassword"
                                    id="repeatPassword"
                                    onChange={handleInputChange}
                                    placeholder={t('nav.register.repeatPassword')}
                                />
                                {errors.repeatPassword &&
                                    errors.repeatPassword.type ===
                                    'repeatPwd' && (
                                        <p className="form-custom-error">
                                            {t('nav.register.repeatPasswordFail')}
                                        </p>
                                    )}
                            </div>
                            <input
                                type="submit"
                                value={t('nav.register.title')}
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
