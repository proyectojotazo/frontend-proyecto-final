import './Layout.scss';
import './Footer.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logomadeja.svg';
import {
    FaFacebook,
    FaInstagramSquare,
    FaTwitter,
    FaYoutube,
} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="container_footer">
                <div className="footerTexto">
                    <div className="logo">
                        <Link to="/">
                            <Logo className="logoFooter" />
                        </Link>
                    </div>
                    <div className="terms">
                        <p>
                            {' '}
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has
                            survived not only five centuries, but also the leap
                            into electronic typesetting, remaining essentially
                            unchanged. It was popularised in the 1960s with the
                            release of Letraset sheets containing Lorem Ipsum
                            passages
                        </p>
                    </div>
                </div>

                <div className="footerPersonas">
                    <h2> Redes Sociales</h2>

                    <a href="/">
                        {' '}
                        <FaFacebook />{' '}
                    </a>
                    <a href="/">
                        {' '}
                        <FaInstagramSquare />{' '}
                    </a>
                    <a href="/">
                        {' '}
                        <FaTwitter />{' '}
                    </a>
                    <a href="/">
                        {' '}
                        <FaYoutube />{' '}
                    </a>
                </div>
                <div className="box__copyright">
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
