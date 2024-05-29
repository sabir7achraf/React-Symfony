import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (loginResponse.data.token) {
                setToken(loginResponse.data.token); // Stocker le token dans l'état local
                localStorage.setItem('token', loginResponse.data.token); // Stocker le token dans localStorage
                setError('');
            } else {
                setError('Login failed.');
                setToken('');
            }
        } catch (error) {
            setError('Login failed.');
            setToken('');
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            {token && (
                <div>
                    <h3>Login successful!</h3>
                    <p>Your token: {token}</p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;
