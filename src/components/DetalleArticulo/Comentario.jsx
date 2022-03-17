import { useState, useEffect } from 'react';
import moment from 'moment';

import { getUserById } from '../../api/services/usuarios';

import './comentario.scss';

function Comentario({ comentario }) {
    const userId = comentario.usuario[0];

    const [usuario, setUsuario] = useState({});
    const [error, setError] = useState({
        message: '',
        active: false,
    });

    useEffect(() => {
        getUserById(userId)
            .then(setUsuario)
            .catch((err) => setError({ message: err.message, active: true }));
    }, [userId]);

    return (
        <div className="comentario__info-wrapper">
            <p className="info__usuario">
                Usuario: {usuario.nickname || 'Desconocido'}
            </p>
            <p className="info__texto-comentario">
                Comentario: {comentario.contenido}
            </p>
            <p className="info__fecha-comentario">
                Fecha:{' '}
                {moment(comentario.fechaPublicacion)
                    .startOf('miliseconds')
                    .fromNow()}
            </p>
        </div>
    );
}

export default Comentario;
