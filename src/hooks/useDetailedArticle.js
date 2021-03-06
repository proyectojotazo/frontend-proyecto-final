import { useState, useEffect } from 'react';

import { getArticulosId } from './../api/services/articulos';

const useDetailedArticle = (id) => {
    const [art, setArticulo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({
        message: '',
        active: false,
    });

    useEffect(() => {
        getArticulosId(id)
            .then(setArticulo)
            .catch((err) => setError({ message: err.message, active: true }))
            .finally(() => setLoading(false));
    }, [id]);

    const updateComments = (comment) => {
        setArticulo((prev) => ({
            ...prev,
            comentarios: [...prev.comentarios, comment],
        }));
    };

    const deleteComments = (idComment) => {
        setArticulo((prev) => ({
            ...prev,
            comentarios: prev.comentarios.filter(
                (comment) => comment._id !== idComment
            ),
        }));
    };

    return { art, loading, error, updateComments, deleteComments };
};

export default useDetailedArticle;
