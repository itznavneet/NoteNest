import { useState } from "react";
import "./EventForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";

export default function EventForm({ handleClose }) {

    const [timeHour, setTimeHour] = useState('');
    const [timeMinute, setTimeMinute] = useState('');
    const [timePeriod, setTimePeriod] = useState('AM');

    const [event, setEvent] = useState({
        date: "",
        time: "",
        type: "Birthday",
        remark: ""
    });

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const token = localStorage.getItem("event-noter-token");

 const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTime = `${timeHour.padStart(2, '0')}:${timeMinute.padStart(2, '0')} ${timePeriod}`;

    try {
        await axios.post(`${BASE_URL}/api/events/add`, {
            ...event,
            time: formattedTime, // 👈 Ensure this gets passed, not event.time
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        toast.success("Event created!");
        handleClose();
    } catch (err) {
        toast.error("Error: " + (err.response?.data?.error || "Event creation failed"));
    }
};


    return (
        <div className="modal-overlay">
            <div className="modal-form">
                <button className="close-btn" onClick={handleClose}>x</button>
                <h2>Create Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>Date:</label>
                    <input type="date" name="date" required onChange={handleChange} />
                    <label>
                        Time:
                        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <input
                                type="number"
                                min="1"
                                max="12"
                                value={timeHour}
                                onChange={(e) => setTimeHour(e.target.value)}
                                placeholder="HH"
                                required
                            />
                            :
                            <input
                                type="number"
                                min="0"
                                max="59"
                                value={timeMinute}
                                onChange={(e) => setTimeMinute(e.target.value)}
                                placeholder="MM"
                                required
                            />
                            <select value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} required>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </label>


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
