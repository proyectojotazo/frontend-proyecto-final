import client from '../client';

export const getArticulosId = async (id = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles/${id}`;
    return await client.get(url);
};

export const getArticulosCategorias = async (categoria, orden, pagina) => {
    const categoriaFilter = categoria && `&categorias=${categoria}`;
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles?sort=${orden}&skip=${pagina}&limit=6${categoriaFilter}`;
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
