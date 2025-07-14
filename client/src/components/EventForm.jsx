import { useState } from "react";
import "./EventForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export default function EventForm({ handleClose }) {

    const [event, setEvent] = useState({
        date: "",
        type: "Birthday",
        remark: ""
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem("event-noter-token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${BASE_URL}/api/events/add`, event, {
                headers: {
                    Authorization: token
                }
            })
            toast.success("Event created!");
            handleClose()
        } catch (err) {
            toast.error("Error: " + err.response.data.error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-form">
                <button className="close-btn" onClick={handleClose}>x</button>
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="date" name="date" required onChange={handleChange} />

                    <label>Type:</label>
                    <select name="type" onChange={handleChange} value={event.type}>
                        <option>Birthday</option>
                        <option>Anniversary</option>
                        <option>Reminder</option>
                        <option>Meeting</option>
                        <option>Other</option>
                    </select>

                    <label>Remark:</label>
                    <input type="text" name="remark" placeholder="Optional..." onChange={handleChange} />

                    <button type="submit">Save Event</button>
                </form>
            </div>
        </div>
    );
}
