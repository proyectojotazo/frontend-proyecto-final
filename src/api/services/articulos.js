import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
} from '../client';



export const getArticulosId = async (id='') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles/${id}`;
    try {
        return await client.get(url)
    } catch (error) {
        console.log(error)
    }
};

export const getArticulos = async () => {
    
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles`
    try {
        return await client.get(url)
    } catch (error) {
        console.log(error)
    }
};

export const getArticulosCategorias = async (categoria) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/articles?categorias=${categoria}`;
    try {
        return await client.get(url)
    } catch (error) {
        console.log(error)
    }
};
