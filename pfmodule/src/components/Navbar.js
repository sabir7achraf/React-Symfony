// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn }) {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/data">Data</Link></li>
                <li><Link to="/registration">Registration</Link></li>
                {!loggedIn && <li><Link to="/login">Login</Link></li>}
            </ul>
        </nav>
    );
}

export default Navbar;
