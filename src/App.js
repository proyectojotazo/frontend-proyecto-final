import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './contexts/authContext';
import { logout } from './api/services/auth';
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import DetailArticle from './pages/DetailArticle';
import RecoverAccount from './pages/RecoverAccount';
import NewArticlePage from './pages/NewArticlePage';
import MyAccount from './pages/MyAccount';
import UserProfile from './pages/UserProfile';
import SearchArticle from './pages/SearchArticle';
import useUserLogged from './hooks/useUserLogged';
import i18next from './utils/i18n';
import { useTranslation } from 'react-i18next';
import NotFound from './components/common/NotFound';

function App({ isAlreadyLogged }) {
    const [isLogged, setIsLogged] = useState(isAlreadyLogged);
    const { userLogged, updateUserLogged } = useUserLogged();

    const { t } = useTranslation();

    const accountLogin = () => {
        setIsLogged(true);
    };

    const accountLogout = () => {
        logout().then(() => setIsLogged(false));
    };

    const dataUser = () => {
        if (isLogged) {
            const token =
                localStorage.getItem('auth') || sessionStorage.getItem('auth');
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
                return user.id;
            } catch (error) {
                console.error('Error while decoding JWT Token', error);
                return null;
            }
        }
    };

    return (
        <AuthContextProvider
            value={{
                isLogged,
                accountLogin,
                accountLogout,
                dataUser,
                userLogged,
                updateUserLogged,
                t,
            }}
        >
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/articles/:id" element={<DetailArticle />} />
                    <Route path="/user/:nick" element={<UserProfile />} />
                    <Route
                        path="/crear"
                        element={
                            <PrivateRoute>
                                <NewArticlePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/responder/:articleId"
                        element={
                            <PrivateRoute>
                                <NewArticlePage modo="responder" />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/editar/:articleId"
                        element={
                            <PrivateRoute>
                                <NewArticlePage modo="editar" />
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
                    <Route path="/buscar" element={<SearchArticle />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </AuthContextProvider>
    );
}

export default App;
