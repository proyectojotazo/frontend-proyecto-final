import React, { useState } from "react";

import { register as registerService } from "../../../api/services/auth";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ReactComponent as Usuario } from "../../../assets/usuario.svg";
import "./register.scss";

const Register = () => {
  const initialState = {
    nombre: "",
    apellidos: "",
    email: "",
    nickname: "",
    password: "",
    repeatPassword: "",
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
    clearErrors("custom");
  };

  const handleRegister = () => {
    registerService(userData)
      .then((data) => {
        setRegisterSucces(true);
      })
      .catch((err) => {
        setError("custom", {
          type: "manual",
          message: err.message,
        });
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
          {" "}
          <div className="header-login-container">
            <Usuario className="icon icon-usuario" />
            <h3 className="header-login-title">Regístrate</h3>
          </div>
          <div className="login-form-container">
            <form noValidate onSubmit={handleSubmit(handleRegister)}>
              <div className="input-container">
                <label htmlFor="name">Nombre</label>
                <input
                  {...register("name", {
                    required: "Introduce tu nombre",
                  })}
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="form-custom-error">{message}</p>
                  )}
                />
              </div>
              <div className="input-container">
                <label htmlFor="apellidos">Apellidos</label>
                <input
                  {...register("apellidos", {
                    required: "Introduce tus apellidos",
                  })}
                  type="text"
                  name="apellidos"
                  id="apellidos"
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  errors={errors}
                  name="apellidos"
                  render={({ message }) => (
                    <p className="form-custom-error">{message}</p>
                  )}
                />
              </div>
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
                <label htmlFor="nickname">Nickname</label>
                <input
                  {...register("nickname", {
                    required: "Introduce tu nickname",
                  })}
                  type="text"
                  name="nickname"
                  id="nickname"
                  onChange={handleInputChange}
                />
                <ErrorMessage
                  errors={errors}
                  name="apellidos"
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
              <div className="input-container">
                <label htmlFor="repeatPassword">Repite la contraseña</label>
                <input
                  {...register("repeatPassword", {
                    required: "Introduce tu contraseña",
                  })}
                  type="password"
                  name="repeatPassword"
                  id="repeatPassword"
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
