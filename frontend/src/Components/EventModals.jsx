import React from 'react';
import Modal from './Modal';

function EventModals({
  isModalOpen,
  setIsModalOpen,
  eventData,
  setEventData,
  handleCreateEvent,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  registrationData,
  setRegistrationData,
  isAttendeesModalOpen,
  setIsAttendeesModalOpen,
  attendees,
  handleRegisterSubmit,
  attendeePage,
  setAttendeePage,
  totalAttendeePages
}) {
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to register for the event.");
      setIsRegisterModalOpen(false);
    } else {
      handleRegisterSubmit(e);
    }
  };

  return (
    <>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Create New Event</h2>
        <form onSubmit={handleCreateEvent} className='event-form'>
          <label>Title:</label>
          <input type='text' name='title' value={eventData.title} onChange={handleChange} required />
          <label>Description:</label>
          <textarea name='description' value={eventData.description} onChange={handleChange} required></textarea>
          <label>Date:</label>
          <input type='date' name='date' value={eventData.date} onChange={handleChange} required />
          <label>Location:</label>
          <input type='text' name='venue' value={eventData.venue} onChange={handleChange} required />
          <button type='submit'>Create Event</button>
          <button type='button' onClick={() => setIsModalOpen(false)}>Close</button>
        </form>
      </Modal>

      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <h2>Register for Event</h2>
        <form className='event-form' onSubmit={handleRegisterClick}>
          <label>Name:</label>
          <input
            type='text'
            name='name'
            value={registrationData.name}
            onChange={e => setRegistrationData({ ...registrationData, name: e.target.value })}
            required
          />
          <label>Age:</label>
          <input
            type='number'
            name='age'
            value={registrationData.age}
            onChange={e => setRegistrationData({ ...registrationData, age: e.target.value })}
            required
          />
          <button type='submit'>Register</button>
          <button type='button' onClick={() => setIsRegisterModalOpen(false)}>Close</button>
        </form>
      </Modal>

      <Modal isOpen={isAttendeesModalOpen} onClose={() => setIsAttendeesModalOpen(false)}>
        <h2>Attendees</h2>
        {attendees.length === 0 ? (
          <p>No attendees yet.</p>
        ) : (
          <ul>
            {attendees.map((person, i) => (
              <li key={i}>{person.name} (Age: {person.age})</li>
            ))}
          </ul>
        )}
        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            disabled={attendeePage <= 1}
            onClick={() => setAttendeePage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>Page {attendeePage} of {totalAttendeePages}</span>
          <button
            disabled={attendeePage >= totalAttendeePages}
            onClick={() => setAttendeePage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
        <button style={{ marginTop: '10px' }} onClick={() => setIsAttendeesModalOpen(false)}>Close</button>
      </Modal>
    </>
  );
}

export default EventModals;
