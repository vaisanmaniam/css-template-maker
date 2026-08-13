import { useState } from "react";
import { registerUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./Auth.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    try {
      registerUser(form);
      setSuccess("Registered successfully! Redirecting to login...");
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (e) {
      setError(e.message);
      setSuccess("");
      toast.error(e.message || "Registration failed");
    }
  };

  return (
    <>
      <div className="auth-page">
        {/* Swipe Animation */}
        <div className="swipe-layer swipe1"></div>
        <div className="swipe-layer swipe2"></div>
        <div className="swipe-layer swipe3"></div>

        {/* Content */}
        <div className="auth-content glass-card w-96">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          <input
            className="glass-input"
            placeholder="Username"
            value={form.username}
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <input
            type="password"
            className="glass-input"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <div className="text-red-600 text-sm text-center mb-3">{error}</div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center mb-3">{success}</div>
          )}

          <button onClick={handleRegister} className="glass-btn">
            Register
          </button>

          <div className="mt-4 text-center">
            <Link to="/login" className="text-white hover:underline text-sm">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
