import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { setAuthorizationHeader } from './api/client';
import App from './App';
import storage, { session } from './utils/storage';

const accesToken = storage.get('auth') || session.get('auth');
setAuthorizationHeader(accesToken);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App isAlreadyLogged={!!accesToken} />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
