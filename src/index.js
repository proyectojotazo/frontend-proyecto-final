import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { setAuthorizationHeader } from './api/client';
import App from './App';
import storage, { session } from './utils/storage';
import Spinner from './components/common/Spinner';

const accesToken = storage.get('auth') || session.get('auth');
setAuthorizationHeader(accesToken);


ReactDOM.render(
    // esto tengo que verlo con vosotros, el suspense es una nueva función que cargar por ejemplo un spinner hasta que carga el contenido
    <Suspense fallback={<Spinner/>}>
        <React.StrictMode>
            <BrowserRouter>
                <App isAlreadyLogged={!!accesToken} />
            </BrowserRouter>
        </React.StrictMode>
    </Suspense>,
    
    document.getElementById('root')
);
