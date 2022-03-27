import './Layout.scss';
import './Header.scss';
import React from 'react';
import { ReactComponent as Gente } from '../../assets/gente.svg';
import { useAuth } from '../../contexts/authContext';

function Header() {
    const {t} = useAuth();
    return (
        <header className="header">
            <div className="imagen">
                <Gente />
            </div>
            <div className="texto">
                <h1>
                    {t('header.creates')}, <br /> {t('header.writes')} <br /> & {t('header.share')}
                </h1>
                <p>
                    {t('header.subtitle')}
                </p>
            </div>
        </header>
    );
}

export default Header;
