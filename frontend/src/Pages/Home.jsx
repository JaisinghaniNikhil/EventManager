import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import EventList from '../Components/EventList';
import EventModals from '../Components/EventModals';
import '../cssfiles/home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({ title: '', date: '', description: '', venue: '' });
  const [registrationData, setRegistrationData] = useState({ name: '', age: '' });
  const [attendees, setAttendees] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [attendeePage, setAttendeePage] = useState(1);
  const [totalAttendeePages, setTotalAttendeePages] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAttendeesModalOpen, setIsAttendeesModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('https://eventmanager-1-suhl.onrender.com/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to create an event');
      setIsModalOpen(false);
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post('https://eventmanager-1-suhl.onrender.com/events', eventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Event Created');
      setEvents((prev) => [...prev, response.data.event]);
      setIsModalOpen(false);
      setEventData({ title: '', date: '', description: '', venue: '' });
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Failed to create event');
    }
  };


  const handleRegisterClick = (eventId) => {
    setSelectedEventId(eventId);
    setRegistrationData({ name: '', age: '' });
    setIsRegisterModalOpen(true);
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventId) {
      alert("No event selected");
      return;
    }

    try {
      await axios.post('https://eventmanager-1-suhl.onrender.com/attendees/register', {
        name: registrationData.name,
        age: registrationData.age,
        eventId: selectedEventId
      });

      alert("Successfully Registered!");
      setIsRegisterModalOpen(false);
    } catch (err) {
      console.error("Error registering attendee:", err);
      alert("Failed to register attendee.");
    }
  };


  const fetchAttendees = async (eventId, page = 1) => {
    try {
      const response = await axios.get(`https://eventmanager-1-suhl.onrender.com/attendees/event/${eventId}?page=${page}`);
      setAttendees(response.data.attendees);
      setTotalAttendeePages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching attendees:", err);
      alert("Failed to fetch attendees.");
    }
  };

  const handleViewAttendeesClick = async (eventId) => {
    setSelectedEventId(eventId);
    setAttendeePage(1);
    await fetchAttendees(eventId, 1);
    setIsAttendeesModalOpen(true);
  };


  useEffect(() => {
    if (isAttendeesModalOpen && selectedEventId) {
      fetchAttendees(selectedEventId, attendeePage);
    }
  }, [attendeePage]);

  return (
    <div className='home'>
      <Header />
      <div className='in-home'>
        <h2>Upcoming Events</h2>
        <button
          onClick={() => {
            const token = localStorage.getItem('token');
            if (!token) {
              alert('Please log in to create an event');
              navigate('/login');
            } else {
              setIsModalOpen(true);
            }
          }}
        >
          Add Event+
        </button>
      </div>

      <EventList
        events={events}
        onRegister={handleRegisterClick}
        onViewAttendees={handleViewAttendeesClick}
      />

      <EventModals
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        eventData={eventData}
        setEventData={setEventData}
        handleCreateEvent={handleCreateEvent}
        isRegisterModalOpen={isRegisterModalOpen}
        setIsRegisterModalOpen={setIsRegisterModalOpen}
        registrationData={registrationData}
        setRegistrationData={setRegistrationData}
        isAttendeesModalOpen={isAttendeesModalOpen}
        setIsAttendeesModalOpen={setIsAttendeesModalOpen}
        attendees={attendees}
        handleRegisterSubmit={handleRegisterSubmit}
        attendeePage={attendeePage}
        setAttendeePage={setAttendeePage}
        totalAttendeePages={totalAttendeePages}
      />
    </div>
  );
}

export default Home;
