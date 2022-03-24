import './Layout.scss';
import './Footer.scss';
import React from 'react';
import { ReactComponent as FooterCafe } from '../../assets/footerCafe.svg';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container_footer">
                <div className="footer__footerTexto">
                    <h1>Práctica Final: elúltimoymevoy</h1>
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
                        Todos los derechos reservados © 2022 {''}
                        <b>El Ultimo & Me Voy</b>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
