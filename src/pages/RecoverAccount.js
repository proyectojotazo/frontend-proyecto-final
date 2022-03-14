import React, { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { ReactComponent as Usuario } from '../assets/usuario.svg'

import { recoverAccount } from '../api/services/auth'

const RecoverAccount = () => {
  const { id, token } = useParams()

  const [newPassword, setNewPassword] = useState({})
  const [submittedSucces, setSubmittedSucces] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewPassword({
      ...newPassword,
      [name]: value,
    })
    clearErrors(name)
  }

  const handleRecoverAccount = () => {
    const data = { id, token, password: newPassword.password }
    recoverAccount(data)
      .then(() => {
        setTimeout(() => {
          setSubmittedSucces(true)
        }, 3000)
      })
      .catch((err) => {
        setError('custom', {
          type: 'manual',
          message: err.message,
        })
      })
  }

  if (submittedSucces) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div>
      <div className="header-login-container">
        <Usuario className="icon icon-usuario" />
        <h3 className="header-login-title">Recupera tu cuenta</h3>
      </div>
      <div className="login-form-container recover-form-container">
        <form noValidate onSubmit={handleSubmit(handleRecoverAccount)}>
          <div className="input-container">
            <input
              {...register('password', {
                required: 'Introduce la nueva contraseña',
                pattern: {
                  value:
                    /^(?=.*[a-zÀ-ÿ\u00f1\u00d1])(?=.*[A-ZÀ-ÿ\u00f1\u00d1])(?=.*\d)(?=.*[@$!%*?&\-_])[A-Za-zÀ-ÿ\u00f1\u00d1\d@$!%*?&\-_]{8,}$/,
                  message:
                    'Mínimo 8 carácteres con 1 letra mayúscula, 1 minúscula, 1 número y 1 carácter especial de los siguientes: @$!%*?&-_',
                },
              })}
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              placeholder="Nueva contraseña"
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
            <input
              {...register('repeatPassword', {
                required: 'Introduce de nuevo la contraseña',
                validate: {
                  repeatPwd: (value) => value === newPassword.password,
                },
              })}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              onChange={handleInputChange}
              placeholder="Repite la contraseña"
            />
            {errors.repeatPassword &&
              errors.repeatPassword.type === 'repeatPwd' && (
                <p className="form-custom-error">
                  Tus contraseñas no coinciden
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
            value="Cambiar contraseña"
            className="login-submit-button"
          />

          {submittedSucces && (
            <div>
              <p className="form-custom-succes">
                Se ha cambiado la contraseña correctamente. Se te va a redirigir
                a la página de Inicio.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default RecoverAccount
