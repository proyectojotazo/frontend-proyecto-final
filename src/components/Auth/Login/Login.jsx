import React, { useState, useRef } from 'react';

import { login } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Login = () => {
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

  const [isLogged, setIslogged] = useState(false);

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
      .then((data) => setIslogged(true))
      .catch((err) =>
        setError('custom', {
          type: 'manual',
          message: err.message,
        })
      );
  };

  return (
    <div>
      {!isLogged ? (
        <div className="login-form-container">
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="input-container">
              <label htmlFor="email">Correo electrònico</label>
              <input
                {...register('email', {
                  required: 'Introduce tu correo electrònico',
                })}
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
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
              <label htmlFor="password">Contraseña</label>
              <input
                {...register('password', {
                  required: 'Introduce tu contraseña',
                })}
                type="password"
                name="password"
                id="password"
                onChange={handleInputChange}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="form-custom-error">{message}</p>
                )}
              />
            </div>
            <div className="input-container">
              <label htmlFor="remember">Recuerdame</label>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                onChange={handleInputChange}
              />
            </div>
            <ErrorMessage
              errors={errors}
              name="custom"
              render={({ message }) => (
                <p className="form-custom-error">{message}</p>
              )}
            />
            <input type="submit" value="Entrar" />
          </form>
        </div>
      ) : (
        <div className="welcome-message">
          <h3>Bienvenido a El ultimo y me voy! :)</h3>
        </div>
      )}
    </div>
  );
};

export default Login;
