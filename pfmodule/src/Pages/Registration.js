import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerResponse = await axios.post('http://localhost:8000/register', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (registerResponse.status === 200) {
                navigate('/login');

            } else {
                setError('Registration failed.');
                setMessage('');
            }
        } catch (error) {
            setError('Registration failed.');
            setMessage('');
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegister}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Register;
