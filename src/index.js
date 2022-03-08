import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { setAuthorizationHeader } from './api/client';
import App from './App';
import storage from './utils/storage';

const accesToken = storage.get('auth');
setAuthorizationHeader(accesToken);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App isAlreadyLogged={!!accesToken} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
