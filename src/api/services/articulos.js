import client from '../client';

export const getArticulosId = async (id = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles/${id}`;
    return await client.get(url);
};

export const getArticulosCategorias = async (categoria, orden, pagina) => {
    const categoriaFilter = categoria && `&categorias=${categoria}`;
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles?sort=${orden}&skip=${pagina}&limit=6&estado=Publicado${categoriaFilter}`;
    try {
        return await client.get(url);
    } catch (error) {
        console.log(error);
    }
};

export const crearComentario = async (id, contenido) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/comment/${id}`;
    try {
        return await client.post(url, { contenido });
    } catch (error) {
        console.log(error);
    }
};

export const crearArticulo = async (data) => {
    return client
        .post('articles', data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

export const searchArticle = async (data, categoria, orden, pagina) => {
    const categoriaFilter = categoria && `&categorias=${categoria}`;
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles/search?sort=${orden}&skip=${pagina}&limit=6&estado=Publicado${categoriaFilter}`;
    try {
        return await client.post(url, data);
    } catch (error) {
        console.log(error);
    }
};

export const getAllCategorias = async () => {
    return client.get('/articles/categories').catch((error) => {
        return Promise.reject(error);
    });
};

export const responderArticulo = async (idArticulo, data) => {
    return client
        .post(`/articles/response/${idArticulo}`, data)
        .catch((error) => {
            return Promise.reject(error);
        });
};

export const deleteArticle = async (id) => {
    return client.delete(`/articles/${id}`).catch((error) => {
        return Promise.reject(error);
    });
};

export const editArticle = async (id, data) => {
    return client.patch(`/articles/${id}`, data).catch((error) => {
        return Promise.reject(error);
    });
};

export const deleteComment = async (id) => {
    return client.delete(`/comment/${id}`).catch((error) => {
        return Promise.reject(error);
    });
};
