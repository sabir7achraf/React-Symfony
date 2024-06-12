import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();  // Assurez-vous que l'événement est bien défini ici
        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (loginResponse.data.token) {
                localStorage.setItem('token', loginResponse.data.token);
                onLogin();
                navigate('/profile');
                setError('');
            } else {
                setError('Login failed.');
            }
        } catch (error) {
            setError('Login failed.');
            console.error('Login failed:', error);
        }
    };

    const onButtonClick = () => {
        setEmailError('');
        setPasswordError('');

        if (email === '') {
            setEmailError('Please enter your email');
            return;
        }

        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            return;
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            return;
        }

        handleLogin({ preventDefault: () => {} }); // Appel direct de handleLogin avec un objet factice
    };

    return (
        <div className="mainContainer">
            <div className="titleContainer">
                <div>Login</div>
            </div>
            <br />
            <form onSubmit={handleLogin}>
                <div className="inputContainer">
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="inputBox"
                    />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <br />
                <div className="inputContainer">
                    <button type="button" onClick={onButtonClick} className="inputButton">Log in</button>
                </div>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Login;
