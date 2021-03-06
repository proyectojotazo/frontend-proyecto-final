import client, {
    removeAuthorizationHeader,
    setAuthorizationHeader,
} from '../client';

import storage, { session } from '../../utils/storage';

// GET
export const getUser = async (nickname) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/users/${nickname}`;
    return await client.get(url);
};

export const register = (data) => {
    const userData = {
        nombre: data.name,
        apellidos: data.apellidos,
        email: data.email,
        nickname: data.nickname,
        password: data.password,
    };

    return client.post('register', userData).catch((error) => {
        return Promise.reject(error);
    });
};

export const login = (data) => {
    const credentials = { email: data.email, password: data.password };
    return client.post('login', credentials).then(({ token }) => {
        setAuthorizationHeader(token);
        if (data.remember) {
            storage.set('auth', token);
        } else {
            session.set('auth', token);
        }
    });
};

export const logout = () =>
    Promise.resolve().then(() => {
        removeAuthorizationHeader();
        storage.remove('auth');
        session.remove('auth');
    });

export const recoverPassword = (data) => {
    const email = { email: data.email };
    return client.post('password-reset', email).catch((error) => {
        return Promise.reject(error);
    });
};

export const recoverAccount = (data) => {
    return client
        .post(`password-reset/${data.id}/${data.token}`, {
            password: data.password,
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

// PATCH
export const userUpdate = async (id, data) => {
    return await client.patch(`users/${id}`, data);
};

// DELETE
export const deleteUser = async (id) => {
    try {
        await client.delete(`users/${id}`);
        storage.remove('auth');
        session.remove('auth');
    } catch (error) {
        console.log(error);
    }
};
