import React, { useState, useEffect, createContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { createSession, validateSession } from './ApiFetch';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await validateSession(token);
                if (response.data) {
                    setUser(response.data);
                }
            }

            setLoading(false);
        };
        validateToken();
    }, []);

    const login = async (email, password) => {
        const response = await createSession(email, password);

        if (
            response === 'Request failed with status code 400' ||
            response === 'Request failed with status code 401'
        ) {
            return false;
        }

        const token = response.data.tokens.access;
        const loggedUser = response.data.user;

        localStorage.setItem('token', token);

        setUser(loggedUser);
        navigate('/');
        return true;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                authenticated: !!user,
                user,
                loading,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
