import { useState, useEffect } from "react";
import "./Home.css";
import Footer from "../components/Footer";
import EventForm from "../components/EventForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState("");
  const [events, setEvents] = useState([]);

  const { token, user } = useAuth();

  const handleClose = () => {
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/events/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Event deleted successfully");
      getEvents(); // Refresh the list
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("Failed to delete event.");
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/events/my-events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
      toast.error("Could not load events.");
    }
  };

  useEffect(() => {
    if (token) getEvents();
  }, [token, showForm]);

  useEffect(() => {
    if (user?.name) setUsername(user.name);
  }, [user]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Hey! {username} 👋</h1>
      </div>

      <button className="create-btn" onClick={() => setShowForm(true)}>
        ➕ Create Event
      </button>

      {showForm && <EventForm handleClose={handleClose} />}

      <div className="event-list">
        <h2>Your Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map((event) => {
              // Combine date and time to check if it's past
              const eventDateTime = new Date(`${event.date} ${event.time}`);
              const now = new Date();
              const isPast = eventDateTime < now;

              return (
                <li key={event._id} className={isPast ? "event past" : "event upcoming"}>
                  <div className="event-text">
                    <strong>{event.type}</strong> on <em>{event.date}</em> at <em>{event.time}</em><br />
                    <span>{event.remark}</span>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(event._id)}
                  >
                    X
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Footer />
    </div>
  );
}
