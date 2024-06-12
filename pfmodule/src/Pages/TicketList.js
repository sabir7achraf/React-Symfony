import React, { useState, useEffect } from 'react';
import TicketCard from './ticketCard';
import axios from 'axios';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token'); // Récupération du jeton
            try {
                const response = await axios.get('http://localhost:8000/api/tickets/current-month', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setTickets(response.data);
            } catch (error) {
                console.error('Failed to fetch tickets:', error);
            }
        };

        fetchTickets();
    }, []);

    const handleReserve = async (ticketId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User is not authenticated');
            return;
        }

        const userId = localStorage.getItem('userId'); // Assuming you store userId in localStorage

        try {
            await axios.post(`http://localhost:8000/api/tickets/${ticketId}/reserve`, { userId }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Ticket reserved successfully!');
        } catch (error) {
            console.error('Failed to reserve ticket:', error);
            alert('Failed to reserve ticket: ' + error.message);
        }
    };


    return (
        <div className="ticket-list">
            {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} onReserve={handleReserve} />
            ))}
        </div>
    );
};

export default TicketList;
