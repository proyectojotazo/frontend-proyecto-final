import './Layout.scss';
import './Footer.scss';
import React from 'react';
import { ReactComponent as FooterCafe } from '../../assets/footerCafe.svg';
import { useAuth } from '../../contexts/authContext';
import Contact from '../common/Contact';


function Footer() {
    
    const {t} = useAuth();
    return (
        <footer className="footer">
            <div className="footer__container_footer">
                <div className="footer__footerTexto">
                    <h1 className='tit'>{t('footer.title')}</h1>
                    <h3 className='sub'>{t('footer.subtitle')}</h3>
                    <div className='equipo'>
                    <Contact
                    imagen="cesar_pinto.jpg"
                    nombre="Cesar Pinto"
                    git="csrap"
                    linkedin="cesar-augusto-pinto"
                    mail="caugusto3110@gmail.com"
                    />
                    <Contact
                        imagen="cesar_pinto.jpg"
                        nombre="Cesar Pinto"
                        git="csrap"
                        linkedin="cesar-augusto-pinto"
                        mail="caugusto3110@gmail.com"
                    />
                    <Contact
                        imagen="cesar_pinto.jpg"
                        nombre="Cesar Pinto"
                        git="csrap"
                        linkedin="cesar-augusto-pinto"
                        mail="caugusto3110@gmail.com"
                    />
                    <Contact
                        imagen="cesar_pinto.jpg"
                        nombre="Cesar Pinto"
                        git="csrap"
                        linkedin="cesar-augusto-pinto"
                        mail="caugusto3110@gmail.com"
                    />
                    <Contact
                        imagen="cesar_pinto.jpg"
                        nombre="Cesar Pinto"
                        git="csrap"
                        linkedin="cesar-augusto-pinto"
                        mail="caugusto3110@gmail.com"
                    />
                    </div>
                    
                </div>
                <div className="footer__footerImagen">
                    <FooterCafe />
                </div>
                <div className="footer__box__copyright">
                    <hr />
                    <p>
                        {t("footer.copyright")}
                        <b>El Ultimo & Me Voy</b>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
