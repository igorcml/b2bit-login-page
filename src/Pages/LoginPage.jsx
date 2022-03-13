import React, { useState, useContext } from 'react';

import { AuthContext } from '../AuthorizationContext.jsx';

import './LoginPage.css';

function LoginPage() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    let isLogged = true;

    const handleSubmit = async (event) => {
        event.preventDefault();

        isLogged = await login(email, password);

        if (!isLogged) {
            document.getElementById('fail').style.visibility = 'visible';
        }
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
                <div className="fail-login" id="fail">
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
