// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import About from './Pages/About';
import Data from './Pages/Data';
import Registration from './Pages/Registration';
import Login from './Pages/Login';
import Navbar from './components/Navbar';
import UserProfile from './Pages/UserProfile';
import PersonalProfile from './Pages/tjribaProfil';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    return (
        <Router>
            <div>
                <Navbar loggedIn={loggedIn} />
                <main>
                    <Routes>
                        <Route path="/" element={<Home email={email} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
                        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/data" element={<Data />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/profile" element={<UserProfile />} />
                        <Route path="/pro" element={<PersonalProfile />} />

                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
