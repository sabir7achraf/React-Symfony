import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Data from './Pages/Data';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import TicketList from './Pages/TicketList';
import Profile from './Pages/UserProfile';
import CreateTicket from "./Pages/CreateTicket";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setLoggedIn(true);
        }
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    if (loading) {
        return <div>Loading...</div>; // or a loading spinner
    }

    return (
        <Router>
            <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/data" element={<Data />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/profile"
                    element={loggedIn ? <Profile /> : <Navigate to="/login" />}
                />
                <Route
                    path="/ticket"
                    element={loggedIn ? <TicketList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/create-ticket"
                    element={loggedIn ? <CreateTicket /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;
