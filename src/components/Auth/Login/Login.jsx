import React, { useState } from "react";

import { useAuth } from "../../../contexts/authContext";
import { login } from "../../../api/services/auth";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ReactComponent as Usuario } from "../../../assets/usuario.svg";
import "./login.scss";

const Login = () => {
  const initialState = {
    email: "",
    password: "",
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

  const { isLogged, accountLogin, accountLogout } = useAuth();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: name === "remember" ? event.target.checked : value,
    });
    clearErrors(name);
    clearErrors("custom");
  };

  const handleLogin = () => {
    login(credentials)
      .then((data) => accountLogin())
      .catch((err) =>
        setError("custom", {
          type: "manual",
          message: err.message,
        })
      );
  };

  return (
    <div>
      <div className="header-login-container">
        <Usuario className="icon icon-usuario" />
        <h3 className="header-login-title">Accede a tu cuenta</h3>
      </div>
      <div className="login-form-container">
        <form noValidate onSubmit={handleSubmit(handleLogin)}>
          <div className="input-container">
            <label htmlFor="email">Correo electrònico</label>
            <input
              {...register("email", {
                required: "Introduce tu correo electrònico",
                pattern: {
                  value:
                    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                  message: "Tienes que introducir un correo electrònico",
                },
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
              {...register("password", {
                required: "Introduce tu contraseña",
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
          <div className="input-container remember-container">
            <input
              type="checkbox"
              name="remember"
              id="remember"
              onChange={handleInputChange}
            />
            <label htmlFor="remember">Recuerdame</label>
          </div>
          <ErrorMessage
            errors={errors}
            name="custom"
            render={({ message }) => (
              <p className="form-custom-error">{message}</p>
            )}
          />
          <input type="submit" value="Entrar" className="login-submit-button" />
        </form>
      </div>
    </div>
  );
};

export default Login;
