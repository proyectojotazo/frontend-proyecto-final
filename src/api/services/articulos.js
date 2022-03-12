import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../client";

export const getArticulos = async (id = "") => {
  const url = `${process.env.REACT_APP_API_BASE_URL}/articles/${id}`;
  try {
    return await client.get(url);
  } catch (error) {
    console.log(error);
  }
};

export const getArticulosCategorias = async (categoria, orden, pagina) => {
  const categoriaFilter = categoria && `&categorias=${categoria}`;
  const url = `${process.env.REACT_APP_API_BASE_URL}/articles?sort=${orden}&skip=${pagina}&limit=3${categoriaFilter}`;
  try {
    return await client.get(url);
  } catch (error) {
    console.log(error);
  }
};
