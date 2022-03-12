import React, { useContext } from 'react';

import { AuthContext } from '../AuthorizationContext.jsx';

import './HomePage.css';

function HomePage() {
    const { user, logout } = useContext(AuthContext);
    const img = user.avatar.image_high_url;

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="homePage">
            <div className="btn-container">
                <button onClick={handleLogout} className="btn">
                    Logout
                </button>
            </div>
            <div className="image-container">
                <h4>Profile Picture</h4>
                <img src={img} alt="Profile" className="image" />
                <h2 className="label">
                    Your <strong>Name</strong>
                </h2>
                <p className="content">
                    {user.name} {user.last_name}
                </p>
                <h2 className="label">
                    Your <strong>Email</strong>
                </h2>
                <p className="content">{user.email}</p>
            </div>
        </div>
    );
}

export default HomePage;
