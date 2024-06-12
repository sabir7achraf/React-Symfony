import React from 'react';

const TicketCard = ({ ticket, onReserve }) => {
    return (
        <div className="ticket-card">
            <h2>{ticket.title}</h2>
            <p>{ticket.date}</p>
            <p>{ticket.description}</p>
            <button onClick={() => onReserve(ticket.id)}>Reserve</button>
        </div>
    );
};

export default TicketCard;