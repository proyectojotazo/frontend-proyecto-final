import { useState, useEffect } from 'react';

import { getUserById } from '../../api/services/usuarios';
import getMoment from '../../utils/getMoment';

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
                {usuario.nickname || 'Desconocido'}
            </p>
            <p className="info__texto-comentario">{comentario.contenido}</p>
            <p className="info__fecha-comentario">
                {getMoment(comentario.fechaPublicacion)}
            </p>
        </div>
    );
}

export default Comentario;
