import { useState } from "react";
import "./PageStyles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  import {toast } from 'react-toastify';
  import { useAuth } from "../context/AuthContext";
  import {z} from 'zod'
  import { BASE_URL } from "../config";


// ✅ Define login validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

  export default function Login() {
  const {login } = useAuth();

  const navigate= useNavigate()
  const [form, setForm] = useState({email: '', password: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

   const handleSubmit = async (e) => {
  e.preventDefault();
  const result= loginSchema.safeParse(form)
  if(!result.success){
    result.error?.issues?.forEach((err) => toast.error(err.message));
      return;
  }
  try {
    const res = await axios.post(`${BASE_URL}/api/auth/login`, form);
    const { token, user } = res.data;

    login(user, token); // ✅ use context
    toast.success("Login successful!");
    navigate('/');
  } catch (err) {
    toast.error("Error: " + err.response.data.error);
  }
};


  return (
    <div className="page-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}