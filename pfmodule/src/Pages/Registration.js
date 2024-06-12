import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerResponse = await axios.post('http://localhost:8000/register', { email, password, name, bio}, {
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
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>SIGN UP</div>
            </div>
            <br/>
            <form onSubmit={handleRegister}>
                <div className={'inputContainer'}>
                    <input type="text" className={'inputBox'} value={name} onChange={(e) => setName(e.target.value)}
                           placeholder="Your Name"
                           required/>
                </div>
                <div className={'inputContainer'}>
                    <input type="text" className={'inputBox'} value={bio} onChange={(e) => setBio(e.target.value)}
                           placeholder="About Your Bio"
                           required/>
                </div>
                <div className={'inputContainer'}>
                    <input type="email" className={'inputBox'} value={email} onChange={(e) => setEmail(e.target.value)}
                           placeholder="Email"
                           required/>
                </div>
                <div className={'inputContainer'}>
                    <input type="password" className={'inputBox'} value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="Password" required/>
                </div>
                <button type="submit" className={'inputButton'}>Register</button>
            </form>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};
export default Register;
