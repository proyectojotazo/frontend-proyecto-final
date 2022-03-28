import React, { useState } from 'react';

import { useAuth } from '../../../contexts/authContext';
import { login } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Usuario } from '../../../assets/icons';
import './login.scss';

function Login({ close }) {
    const initialState = {
        email: '',
        password: '',
        remember: false,
    };

    const [credentials, setCredentials] = useState(initialState);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const { accountLogin, t } = useAuth();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: name === 'remember' ? event.target.checked : value,
        });
        clearErrors(name);
        clearErrors('custom');
    };

    const handleLogin = () => {
        login(credentials)
            .then((data) => {
                close();
                accountLogin();
            })
            .catch((err) =>
                setError('custom', {
                    type: 'manual',
                    message: err.message,
                })
            );
    };

    return (
        <div>
            <div className="header-login-container">
                <Usuario className="icon icon-usuario" />
                <h3 className="header-login-title">{t('nav.login.title')}</h3>
            </div>
            <div className="login-form-container">
                <form noValidate onSubmit={handleSubmit(handleLogin)}>
                    <div className="input-container">
                        <input
                            {...register('email', {
                                required: t('common.required.email'),
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
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            {...register('password', {
                                required: t("common.required.password"),
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
                                <p className="form-custom-error">{message}</p>
                            )}
                        />
                    </div>
                    <div className="input-container remember-container">
                        <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            onChange={handleInputChange}
                        />
                        <label htmlFor="remember">{t('nav.login.remember')}</label>
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="custom"
                        render={({ message }) => (
                            <p className="form-custom-error">{message}</p>
                        )}
                    />
                    <input
                        type="submit"
                        value={t('common.get')}
                        className="login-submit-button"
                    />
                </form>
            </div>
        </div>
    );
}

export default Login;
