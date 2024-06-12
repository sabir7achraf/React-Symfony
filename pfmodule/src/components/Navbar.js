import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ loggedIn, onLogout }) {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/data">Data</Link></li>
                {loggedIn ? (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/ticket">Ticket</Link></li>
                        <li><Link to="/create-ticket">Create Ticket</Link></li>
                        <li>
                            <button onClick={onLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                    <li><Link to="/registration">Registration</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;