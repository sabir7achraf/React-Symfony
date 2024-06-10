import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');

        if (email === '') {
            setEmailError('Please enter your email');
            valid = false;
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email');
            valid = false;
        }

        if (password === '') {
            setPasswordError('Please enter a password');
            valid = false;
        } else if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer');
            valid = false;
        }

        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const loginResponse = await axios.post('http://localhost:8000/api/login_check', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (loginResponse.data.token) {
                localStorage.setItem('token', loginResponse.data.token); // Stocker le token dans localStorage
                setError('');
                navigate('/profile'); // Redirection vers la page de profil
            } else {
                setError('Login failed.');
            }
        } catch (error) {
            setError('Login failed.');
            console.error('Login failed:', error);
        }
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
                        type="email"
                        value={email}
                        placeholder="Enter your email here"
                        onChange={(ev) => setEmail(ev.target.value)}
                        className="inputBox"
                    />
                    {emailError && <label className="errorLabel">{emailError}</label>}
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
                    {passwordError && <label className="errorLabel">{passwordError}</label>}
                </div>
                <br />
                <div className="inputContainer">
                    <button className="inputButton" type="submit">Log in</button>
                </div>
                {error && <div className="errorMessage">{error}</div>}
            </form>
        </div>
    );
};

export default Login;
