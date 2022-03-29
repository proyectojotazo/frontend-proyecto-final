import { FaLinkedin, FaGithub, FaRegEnvelope } from 'react-icons/fa';

import './Contact.scss';

function Contact({ imagen, nombre, git, linkedin, mail }) {
    const email = `mailto:${mail}`;
    const img = `/img/${imagen}`;
    return (
        <div className="footer__persona">
            <div className="footer__avatarFooter">
                <img src={img} alt="avatar"></img>
            </div>
            <div className="footer__info_persona">
                <h2>{nombre}</h2>
                <h3>Full Stack Developer</h3>
                <div className="footer__info_personaIconos">
                    <a
                        href={`https://github.com/${git}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub className="iconoFooter" />
                    </a>
                    <a
                        href={`https://www.linkedin.com/in/${linkedin}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin className="iconoFooter" />
                    </a>
                    <a
                        className="mailto"
                        href={email}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaRegEnvelope className="iconoFooter" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Contact;
