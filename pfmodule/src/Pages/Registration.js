import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerResponse = await axios.post('http://localhost:8000/register', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { email: userEmail, plainPassword } = registerResponse.data;

            // Automatically login after registration
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', {
                email: userEmail,
                password: plainPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const token = loginResponse.data.token;
            // Store the token and use it for subsequent requests
            localStorage.setItem('token', token);
        } catch (error) {
            console.error('Registration or login failed:', error);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
