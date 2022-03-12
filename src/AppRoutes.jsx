import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';

import LoginPage from './Pages/LoginPage.jsx';
import HomePage from './Pages/HomePage.jsx';

import { AuthProvider, AuthContext } from './AuthorizationContext';

function AppRoutes() {
    const Private = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        return !authenticated ? <Navigate to="/login" /> : children;
    };

    const Public = ({ children }) => {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="loading">Carregando...</div>;
        }
        return authenticated ? <Navigate to="/" /> : children;
    };

    return (
        <Router className="Router">
            <AuthProvider>
                <Routes>
                    <Route
                        exact
                        path="/login"
                        element={
                            <Public>
                                <LoginPage />
                            </Public>
                        }
                    />
                    <Route
                        exact
                        path="/"
                        element={
                            <Private>
                                <HomePage />
                            </Private>
                        }
                    />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default AppRoutes;
