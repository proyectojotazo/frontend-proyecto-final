import { useNavigate } from 'react-router-dom';

import { useAuth } from './../../contexts/authContext';
import './EmptyArticlesMsg.scss';

function EmptyArticlesMsg({ categoria }) {
    const { isLogged } = useAuth();

    const navigate = useNavigate();

    return (
        <div className="empty-articles-msg__wrapper">
            {categoria !== '' ? (
                <h2>
                    No hay artículos publicados con la siguiente categoria:{' '}
                    <span className={categoria}>&lt;{categoria}&gt;</span>
                </h2>
            ) : (
                <h2>No hay articulos, crea el tuyo!</h2>
            )}

            {isLogged ? (
                <button onClick={() => navigate('/crear')}>
                    Crear Articulo
                </button>
            ) : (
                <h3>Regístrate o inicia sesión</h3>
            )}
        </div>
    );
}

export default EmptyArticlesMsg;
