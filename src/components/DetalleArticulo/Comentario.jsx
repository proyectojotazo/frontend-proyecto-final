import { useState, useEffect } from 'react';

import { useAuth } from '../../contexts/authContext';
import { deleteComment } from '../../api/services/articulos';
import getMoment from '../../utils/getMoment';
import DeleteConfirm from '../common/DeleteConfirm';

import { FaTrashAlt } from 'react-icons/fa';

import './comentario.scss';
import { getUser } from './../../api/services/auth';

function Comentario({ ownerArt, comentario, deleteComments }) {
    const userId = comentario.usuario[0];

    const [usuario, setUsuario] = useState({});
    const [showDelete, setShowDelete] = useState(false);
    const [error, setError] = useState({
        message: '',
        active: false,
    });

    const { userLogged, isLogged } = useAuth();
    
    const deleteAuthorized =
        (userLogged._id === userId || userLogged._id === ownerArt) && isLogged;

    useEffect(() => {
        getUser(userId)
            .then(setUsuario)
            .catch((err) => setError({ message: err.message, active: true }));
    }, [userId]);

    const showConfirm = () => {
        setShowDelete(!showDelete);
    };

    const eliminar = async () => {
        await deleteComment(comentario._id);
        deleteComments(comentario._id);
    };

    return (
        <div className="comentario__info-wrapper">
            <p className="info__usuario">
                {usuario.nickname || 'Usuario Eliminado'}
            </p>
            <p className="info__texto-comentario">{comentario.contenido}</p>
            <p className="info__fecha-comentario">
                {getMoment(comentario.fechaPublicacion)}
            </p>
            {deleteAuthorized && (
                <>
                    <p className="info__eliminar-comentario">
                        <FaTrashAlt
                            onClick={showConfirm}
                            className="icons-wrapper__edit"
                        />
                    </p>
                    <DeleteConfirm
                        show={showDelete}
                        msg={'¿Eliminar comentario?'}
                        confirm={eliminar}
                        cancel={showConfirm}
                    />
                </>
            )}
        </div>
    );
}

export default Comentario;
