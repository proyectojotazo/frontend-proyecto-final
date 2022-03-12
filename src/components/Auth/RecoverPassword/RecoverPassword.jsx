import React, { useState, useRef } from "react";

import { useAuth } from "../../../contexts/authContext";
import { recoverPassword } from "../../../api/services/auth";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { ReactComponent as Usuario } from "../../../assets/usuario.svg";
import "./recoverpassword.scss";

const RecoverPassword = () => {
  const initialState = {
    email: "",
    password: "",
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
      [name]: name === "remember" ? event.target.checked : value,
    });
    clearErrors(name);
    clearErrors("custom");
    setIsSubmitted(false);
  };

  const handleRecover = () => {
    recoverPassword(credentials)
      .then((data) => {
        setIsSubmitted(true);
      })
      .catch((err) => {
        console.log(err.message);
        setError("email", {
          type: "manual",
          message: err.message,
        });
      });
  };

  return (
    <div>
      <div className="header-login-container">
        <Usuario className="icon icon-usuario" />
        <h3 className="header-login-title">Recupera tu contraseña</h3>
      </div>
      <div className="login-form-container">
        <form noValidate onSubmit={handleSubmit(handleRecover)}>
          <div className="input-container">
            <label htmlFor="email">Correo electrónico</label>
            <input
              {...register("email", {
                required: "Introduce tu correo electrónico",
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
          {isSubmitted && (
            <div className="succes-message">
              <h2>Se han enviado las instrucciones a tu correo</h2>
            </div>
          )}
          <input
            type="submit"
            value="Recuperar cuenta"
            className="recover-submit-button"
          />
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
