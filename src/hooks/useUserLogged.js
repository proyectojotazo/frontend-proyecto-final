import { useState, useEffect } from 'react';
import { getUserById } from './../api/services/usuarios';

const getUserId = () => {
    const token =
        localStorage.getItem('auth') || sessionStorage.getItem('auth');
    if (token === null) {
        return null;
    }
    const b64Parts = token.split('.');
    if (b64Parts.length !== 3) {
        return null;
    }
    const b64Data = b64Parts[1];
    try {
        const userJSON = atob(b64Data);
        const user = JSON.parse(userJSON);
        return user.id;
    } catch (error) {
        console.error('Error while decoding JWT Token', error);
        return null;
    }
};

const useUserLogged = () => {
    const [userLogged, setUserLogged] = useState({});

    const userId = getUserId();

    const updateUserLogged = (fieldUpdate) => {
        setUserLogged((prev) => ({
            ...prev,
            ...fieldUpdate,
        }));
    };
    useEffect(() => {
        if (userId) {
            getUserById(userId).then(setUserLogged);
        }
    }, [userId]);

    return { userLogged, updateUserLogged };
};

export default useUserLogged;
