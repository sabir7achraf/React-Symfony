import React, { useState } from 'react';
import './CreatTickets.css';
import axios from 'axios';

const CreateTicket = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/create_tickets', {
                title,
                description,
                date,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming you have stored the JWT token in localStorage
                },
            });

            setMessage('Ticket created successfully!');
        } catch (error) {
            console.error('There was an error creating the ticket!', error);
            setMessage('Failed to create ticket.');
        }
    };

    return (
        <div className="create-ticket-container">
            <h2>Create a New Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create Ticket</button>
            </form>
            {message && <p className={message.includes('successfully') ? '' : 'error'}>{message}</p>}
        </div>
    );
};

export default CreateTicket;
