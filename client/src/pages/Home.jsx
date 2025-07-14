import { useState, useEffect } from "react";
import "./Home.css";
import Footer from "../components/Footer";
import EventForm from "../components/EventForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function Home() {

  const [showForm, setShowForm] = useState(false)
  const [username, setUsername] = useState("")
  const [events, setEvents] = useState([]);
  
  const {token, user}= useAuth()

  const handleClose = () => {
    setShowForm(false)
  }

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/events/delete/${id}`, {
      headers: { Authorization: token },
    });
    toast.success("Event deleted successfully")
    getEvents(); // Refresh the list
  } catch (error) {
    console.error("Delete failed", error);
    toast.error("Failed to delete event.");
  }
};


  const getEvents = async () => {
    try {
      const events = await axios.get('http://localhost:5000/api/events/my-events', {
        headers: {
          Authorization: token
        }
      })
      setEvents(events.data)
    } catch (error) {
      console.error("Error fetching events", err);
    }
  }

  useEffect(() => {
    getEvents()
  }, [showForm])

 useEffect(() => {
  if (user?.name) setUsername(user.name);
}, [token]);



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
    const isPast = new Date(event.date) < new Date(); // compare with current date

    return (
      <li key={event._id} className={isPast ? "event past" : "event upcoming"}>
        <div className="event-text">
          <strong>{event.type}</strong> on <em>{event.date}</em><br />
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
<Footer/>
    </div>
  );
}
