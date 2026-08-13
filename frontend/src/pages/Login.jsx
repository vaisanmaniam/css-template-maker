import { useState } from "react";
import { loginUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    try {
      loginUser(form.username, form.password);
      navigate("/profile");
    } catch (e) {
      setError(e.message);
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
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

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

          <button onClick={handleLogin} className="glass-btn">
            Login
          </button>

          <div className="mt-4 text-center">
            <Link to="/register" className="text-white hover:underline text-sm">
              Don't have an account? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
