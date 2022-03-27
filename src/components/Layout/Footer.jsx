import './Layout.scss';
import './Footer.scss';
import React from 'react';
import { ReactComponent as FooterCafe } from '../../assets/footerCafe.svg';
import { useAuth } from '../../contexts/authContext';


function Footer() {
    const {t} = useAuth();
    return (
        <footer className="footer">
            <div className="footer__container_footer">
                <div className="footer__footerTexto">
                    <h1>{t('footer.title')}</h1>
                    <h3>KeepCoding Web Development Bootcamp</h3>
                    <div className='footer__persona'>
                        <img/>
                        <div className='footer__info_persona'>
                            <h2>Cesar</h2>
                            <h3>Actividad</h3>
                            
                        </div>
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
