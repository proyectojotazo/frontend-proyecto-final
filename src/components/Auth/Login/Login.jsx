import React, { useState, useRef } from 'react';

import { login } from '../../../api/services/auth';

import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const Login = () => {
  return (
    <div>
      <div className="login-form-container">
        <form>
          <div className=""></div>
          <label htmlFor="email">Correo electrònico</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" id="password" />
        </form>
      </div>
    </div>
  );
};

export default Login;
