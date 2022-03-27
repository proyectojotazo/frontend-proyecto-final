import React, { useState } from 'react';

import { recoverPassword } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Usuario } from '../../../assets/icons';
import './recoverpassword.scss';
import { useAuth } from '../../../contexts/authContext';

const RecoverPassword = () => {
    const { t } = useAuth();
    const initialState = {
        email: '',
        password: '',
        remember: false,
    };

    const [credentials, setCredentials] = useState(initialState);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCredentials({
            ...credentials,
            [name]: name === 'remember' ? event.target.checked : value,
        });
        clearErrors(name);
        clearErrors('custom');
        setIsSubmitted(false);
    };

    const handleRecover = () => {
        recoverPassword(credentials)
            .then((data) => {
                setIsSubmitted(true);
            })
            .catch((err) => {
                console.log(err.message);
                setError('email', {
                    type: 'manual',
                    message: err.message,
                });
            });
    };

    return (
        <div>
            <div className="header-login-container">
                <Usuario className="icon icon-usuario" />
                <h3 className="header-login-title">{t('nav.login.recover.title')}</h3>
            </div>
            <div className="login-form-container">
                <form noValidate onSubmit={handleSubmit(handleRecover)}>
                    <div className="input-container">
                        <input
                            {...register('email', {
                                required: t('common.email'),
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
                    {isSubmitted && (
                        <div className="succes-message">
                            <h2>
                                {t('nav.login.recover.succes-message')}
                            </h2>
                        </div>
                    )}
                    <input
                        type="submit"
                        value={t('nav.login.recover.recover')}
                        className="recover-submit-button"
                    />
                </form>
            </div>
        </div>
    );
};

export default RecoverPassword;
