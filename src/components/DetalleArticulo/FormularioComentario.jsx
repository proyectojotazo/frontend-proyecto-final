import { useState } from 'react';

import { crearComentario } from './../../api/services/articulos';

import './formularioComentario.scss';

const MAX_CHARS = 240;

function FormularioComentario({ articleId, updateComments }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment === '' || comment.length > MAX_CHARS) return;
        const copy = comment;
        const comentario = await crearComentario(articleId, copy);
        setComment('');
        updateComments(comentario);
    };

    const handleComment = (e) => {
        const { value } = e.target;
        setComment(value);
    };

    const maxReached = comment.length > MAX_CHARS;

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="form-comentario__title">Crea tu comentario</h1>
            <textarea
                value={comment}
                onChange={handleComment}
                className="form-comentario__text-area"
                placeholder="Aqui tu comentario"
            />
            <span
                className={`form-comentario__max-chars ${maxReached && 'max'}`}
            >
                {comment.length} / {MAX_CHARS} Carácteres
            </span>
            <button className="form-comentario__btn">Enviar</button>
        </form>
    );
}

export default FormularioComentario;
