import { useState } from 'react';

import { crearComentario } from './../../api/services/articulos';

import './formularioComentario.scss';

function FormularioComentario({ articleId, updateComments }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Hacer petición de creación de comentario
        if (comment === '') return;

        const comentario = await crearComentario(articleId, comment);
        updateComments(comentario);

        setComment('');
    };

    const handleComment = (e) => {
        const { value } = e.target;
        setComment(value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="form-comentario__title">Crea tu comentario</h1>
            <textarea
                value={comment}
                onChange={handleComment}
                className="form-comentario__text-area"
                placeholder="Aqui tu comentario"
            />
            <button className="form-comentario__btn">Enviar</button>
        </form>
    );
}

export default FormularioComentario;
