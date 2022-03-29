import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Usuario } from '../assets/icons';

import { recoverAccount } from '../api/services/auth';
import { useAuth } from '../contexts/authContext';

function RecoverAccount() {
    const { t } = useAuth();
    const { id, token } = useParams();

    const [newPassword, setNewPassword] = useState({});
    const [submittedSucces, setSubmittedSucces] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPassword({
            ...newPassword,
            [name]: value,
        });
        clearErrors(name);
    };

    const handleRecoverAccount = () => {
        const data = { id, token, password: newPassword.password };
        recoverAccount(data)
            .then(() => {
                setTimeout(() => {
                    setSubmittedSucces(true);
                }, 3000);
            })
            .catch((err) => {
                setError('custom', {
                    type: 'manual',
                    message: err.message,
                });
            });
    };

    if (submittedSucces) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <>
            <Helmet>
                <title>Recupera tu contraseña | El Último & Me Voy</title>
                <meta
                    name="description"
                    content="Blog sobre Desarrollo Web creado como proyecto final del Bootcamp Full Stack Web Developer de KeepCoding"
                />
            </Helmet>
            <div>
                <div className="header-login-container">
                    <Usuario className="icon icon-usuario" />
                    <h3 className="header-login-title">
                        {t('main.recoverAccount.recoverAccount')}
                    </h3>
                </div>
                <div className="login-form-container recover-form-container">
                    <form
                        noValidate
                        onSubmit={handleSubmit(handleRecoverAccount)}
                    >
                        <div className="input-container">
                            <input
                                {...register('password', {
                                    required: t('main.myAccount.passwordNew'),
                                    pattern: {
                                        value: /^(?=.*[a-zÀ-ÿ\u00f1\u00d1])(?=.*[A-ZÀ-ÿ\u00f1\u00d1])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zÀ-ÿ\u00f1\u00d1\d@$!%*?&\-_]{8,}$/,
                                        message: t(
                                            'main.recoverAccount.passwordRules'
                                        ),
                                    },
                                })}
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleInputChange}
                                placeholder={t('main.myAccount.passwordNew')}
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
                                    required: t(
                                        'main.myAccount.RepeatpasswordNew'
                                    ),
                                    validate: {
                                        repeatPwd: (value) =>
                                            value === newPassword.password,
                                    },
                                })}
                                type="password"
                                name="repeatPassword"
                                id="repeatPassword"
                                onChange={handleInputChange}
                                placeholder={t(
                                    'main.myAccount.RepeatpasswordNew'
                                )}
                            />
                            {errors.repeatPassword &&
                                errors.repeatPassword.type === 'repeatPwd' && (
                                    <p className="form-custom-error">
                                        {t('main.myAccount.passwordNot')}
                                    </p>
                                )}
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
                            value={t('main.myAccount.changePassword')}
                            className="login-submit-button"
                        />

                        {submittedSucces && (
                            <div>
                                <p className="form-custom-succes">
                                    {t('main.recoverAccount.passwordMensage')}
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default RecoverAccount;
