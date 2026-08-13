import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import ProfileSidebar from "./ProfileSidebar";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const page = location.pathname === "/" ? "home" : location.pathname.replace("/", "");

  useEffect(() => {
    setUser(getCurrentUser());
  }, [location]);

  return (
    <>
      <nav className={`navbar ${page}`}>
        <div className="nav-logo">
          NextGen Forge
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/about">About</Link>
          <Link to="/prompt">AI Prompt</Link>
          
          {/* PROFILE AVATAR TRIGGER BUTTON */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2 p-1 rounded-full hover:opacity-90 transition-all cursor-pointer border border-white/30 focus:outline-none bg-white/10"
            title="Open Profile Menu"
            aria-label="Open navigation sidebar"
          >
            <img
              src={user?.avatar || "/avatars/avatar1.png"}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-white shadow-xs"
            />
          </button>

          {/* REGISTER BUTTON (When not logged in) */}
          {!user && (
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          )}
        </div>
      </nav>

      {/* SLIDE-OUT PROFILE SIDEBAR DRAWER */}
      <ProfileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
}
