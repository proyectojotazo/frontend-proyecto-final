import './Layout.scss';
import './Footer.scss';
import React from 'react';
import { ReactComponent as FooterCafe } from '../../assets/footerCafe.svg';
import { useAuth } from '../../contexts/authContext';
import Contact from '../common/Contact';

import { FaRegCopyright } from "react-icons/fa";


function Footer() {

    const { t } = useAuth();
    return (
        <footer className="footer">
            <div className="footer__container_footer">
                <div className="footer__footerTexto">
                    <h1 className='tit'>{t('footer.title')}</h1>
                    <h3 className='sub'>{t('footer.subtitle')}</h3>
                    <div className='equipo'>
                        <Contact
                            imagen="cesar_pinto.jpg"
                            nombre="Cesar"
                            git="csrap"
                            linkedin="cesar-augusto-pinto"
                            mail="caugusto3110@gmail.com"
                        />
                        <Contact
                            imagen="miguel.jpg"
                            nombre="Miguel Ángel"
                            git="MiwelR"
                            linkedin="miguelangeldelosrios"
                            mail="rrriosss@gmail.com"
                        />
                        <Contact
                            imagen="josep.jpeg"
                            nombre="Josep Miquel"
                            git="tommyshelby1917"
                            linkedin="josep-miquel-arenas-beltran"
                            mail="josepmiquel@exilium.cat"
                        />
                        <Contact
                            imagen="javier.jpg"
                            nombre="Javier"
                            git="Jotazo"
                            linkedin="javier-guerrero-huete-7032101b9"
                            mail="javigh87@gmail.com"
                        />
                        <Contact
                            imagen="elisabet.jpg"
                            nombre="Elisabet"
                            git="Venganzaalchocolate"
                            linkedin="elisabetdacostaalmiron"
                            mail="venganzaalchocolate@gmail.com"
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
                    </p>
                    <p>
                        <FaRegCopyright
                            className="copyright-icon"
                        />
                        <span className="text-copy"> 2022 Copyright </span>
                    </p>

                    <p>El Ultimo & Me Voy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
