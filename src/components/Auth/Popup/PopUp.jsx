import React, { useState } from 'react';
import { useAuth } from '../../../contexts/authContext';

import Login from '../Login/Login';
import RecoverPassword from '../RecoverPassword/RecoverPassword';
import Register from '../Register/Register';

import './popup.scss';

function Popup({ close }) {
    const { t } = useAuth();
    const [showLogin, setShowLogin] = useState(true);
    const [showRecover, setShowRecover] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const openLogin = () => {
        setShowLogin(true);
        setShowRecover(false);
        setShowRegister(false);
    };

    const openRegister = () => {
        setShowRegister(true);
        setShowLogin(false);
        setShowRecover(false);
    };

    const openRecover = () => {
        setShowRecover(true);
        setShowLogin(false);
        setShowRegister(false);
    };

    return (
        <div>
            <div>
                {showLogin && (
                    <>
                        <Login close={close} />
                        <div className="recover-link-container">
                            <p className="popup-links" onClick={openRecover}>
                                {t('nav.login.popup.openRecover')}
                            </p>
                        </div>
                        <div className="register-link-container">
                            <p className="popup-links" onClick={openRegister}>
                                {t('nav.login.popup.openRegister')}
                            </p>
                        </div>
                    </>
                )}

                {showRecover && (
                    <>
                        <RecoverPassword />
                        <div className="goback-link-container">
                            <p className="popup-links" onClick={openLogin}>
                                {t('common.back')}
                            </p>
                        </div>
                    </>
                )}

                {showRegister && (
                    <>
                        <Register />
                        <div className="goback-link-container">
                            <p className="popup-links" onClick={openLogin}>
                                {t('common.back')}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Popup;
