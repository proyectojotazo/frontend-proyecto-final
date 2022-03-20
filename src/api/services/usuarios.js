import client from '../client';

// GET
export const getUserById = async (id = '') => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users/${id}`;
    return await client.get(url);
};

// POST
export const followUser = async (id) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users/follow/${id}`;
    return await client.post(url);
};
