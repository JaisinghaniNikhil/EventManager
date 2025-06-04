import React from 'react';

function EventList({ events, onRegister, onViewAttendees }) {
  return (
    <div className='event-list'>
      {events.map((event, index) => (
        <div key={index} className='event-card'>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <div className='details'>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </div>
          <div className='attendees'>
            <button onClick={() => onRegister(event._id)}>Register</button>
            <button onClick={() => onViewAttendees(event._id)}>View Attendees</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventList;
