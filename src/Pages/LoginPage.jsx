import React, { useState, useContext } from 'react';

import { AuthContext } from '../AuthorizationContext.jsx';

import './LoginPage.css';

function LoginPage() {
    const { authenticated, login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    let triedLogin = false;

    const handleSubmit = async (event) => {
        event.preventDefault();

        //integracao com contexto / api
        triedLogin = await login(email, password);
    };

    return (
        <div id="login">
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <h3>
                    b2b
                    <span className="it">it</span>
                </h3>
                <div
                    className="fail-login"
                    style={{
                        display:
                            !authenticated && triedLogin ? 'block' : 'none',
                    }}>
                    <p>No active account found with the given credentials.</p>
                </div>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="@gmail.com"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="********"
                        id="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Sing In</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
