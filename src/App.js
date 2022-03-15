import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/authContext';
import { logout } from './api/services/auth';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Article from './pages/Article';
import RecoverAccount from './pages/RecoverAccount';
import CreaArticle from './pages/CreaArticle';
import MyAccount from './pages/MyAccount';

function App({ isAlreadyLogged }) {
    const [isLogged, setIsLogged] = useState(isAlreadyLogged);

    const accountLogin = () => {
        setIsLogged(true);
    };

    const accountLogout = () => {
        logout().then(() => setIsLogged(false));
    };

    const dataUser = () => {
        if (isLogged) {
            const token = localStorage.getItem('auth');
            if (token === null) {
                return null;
            }
            const b64Parts = token.split('.');
            if (b64Parts.length !== 3) {
                return null;
            }
            const b64Data = b64Parts[1];
            try {
                const userJSON = atob(b64Data);
                const user = JSON.parse(userJSON);
                return user;
            } catch (error) {
                console.error('Error while decoding JWT Token', error);
                return null;
            }
        }
    };

    return (
        <AuthContextProvider
            value={{ isLogged, accountLogin, accountLogout, dataUser }}
        >
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles/:id" element={<Article />} />
                    <Route
                        path="/crear"
                        element={
                            <PrivateRoute>
                                <CreaArticle />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/my-account"
                        element={
                            <PrivateRoute>
                                <MyAccount />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/recuperatucuenta/:id/:token"
                        element={<RecoverAccount />}
                    />
                </Routes>
            </Layout>
        </AuthContextProvider>
    );
}

export default App;
