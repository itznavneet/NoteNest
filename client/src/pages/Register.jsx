import { useState } from "react";
import "./PageStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { BASE_URL } from "../config";


// Zod validation schema
const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate with Zod
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      // console.log("error on registerSchema", result)
          result.error?.issues?.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, form);
      const { token, user } = res.data;

      login(user, token); // store in context
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.error || "Registration failed"));
    }
  };

  return (
    <div className="page-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="name" placeholder="Name" required onChange={handleChange} />
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
