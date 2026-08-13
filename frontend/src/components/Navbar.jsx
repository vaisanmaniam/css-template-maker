import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const page = location.pathname === "/" ? "home" : location.pathname.replace("/", "");

  return (
    <nav className={`navbar ${page}`}>
      <div className="nav-logo">
        NextGen Forge
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/about">About</Link>
        <Link to="/prompt">AI Prompt</Link>
        <Link to="/profile">Profile</Link>

        {/* Register Button */}
        <Link to="/register" className="nav-btn">
          Register
        </Link>
      </div>
    </nav>
  );
}
