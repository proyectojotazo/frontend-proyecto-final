import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import { getUser } from '../api/services/auth';

function MyAccount() {
    const { dataUser } = useAuth();

    useEffect(() => {}, []);

    return (
        <>
            <div>
                <h1>Mi Cuenta</h1>
            </div>
        </>
    );
}

export default MyAccount;
