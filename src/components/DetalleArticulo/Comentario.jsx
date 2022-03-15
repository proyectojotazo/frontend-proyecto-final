import { useState, useEffect } from 'react';
import Spinner from '../common/Spinner';
import moment from 'moment';

import { getUserById } from '../../api/services/usuarios';

function Comentario({ comentario }) {
    const userId = comentario.usuario[0];

    console.log(comentario);
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
        <>
            <p className="comentario__texto-comentario">
                {comentario.contenido}
            </p>
            <p>Usuario: {usuario.nickname}</p>
            <p>
                {moment(comentario.fechaPublicacion).startOf('hour').fromNow()}
            </p>
        </>
    );
}

export default Comentario;
