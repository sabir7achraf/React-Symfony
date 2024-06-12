import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        bio: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('User not authenticated');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="container">
            <h1 className="title">Profil Utilisateur</h1>
            <div className="profileContainer">
                <h2 className="name">{user.name}</h2>
                <p className="email">{user.email}</p>
                <p className="bio">{user.bio}</p>
            </div>
        </div>
    );
};

export default Profile;