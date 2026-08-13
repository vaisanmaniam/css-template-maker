import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { getCurrentUser, logoutUser } from "../utils/auth";

export default function ProfileSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    onClose();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleNavClick = (path) => {
    onClose();
    navigate(path);
  };

  const avatarSrc = user?.avatar || "/avatars/avatar1.png";
  const username = user?.username || "Guest User";

  return (
    <>
      {/* Dark Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-[1050] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out Sidebar Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[320px] bg-slate-900/95 backdrop-blur-2xl text-white border-l border-white/10 shadow-2xl z-[1060] flex flex-col transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header / Close Button */}
        <div className="p-5 flex justify-between items-center border-b border-white/10">
          <span className="font-bold text-xs uppercase tracking-wider text-pink-400">Account & Navigation</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-lg font-bold transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
          {/* USER INFO SECTION */}
          <div className="flex flex-col items-center text-center p-4 bg-white/5 rounded-2xl border border-white/10">
            <img
              src={avatarSrc}
              alt={username}
              className="w-20 h-20 rounded-full object-cover border-2 border-pink-500/80 shadow-lg mb-3"
            />
            <h3 className="font-bold text-lg text-white">{username}</h3>
            <span className="text-xs text-pink-400 font-medium mt-0.5">
              {user ? `@${username.toLowerCase()}` : "Not logged in"}
            </span>
          </div>

          {/* QUICK NAVIGATION LINKS */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase text-gray-400 px-3 mb-1">
              Navigation
            </span>

            {[
              { label: "Home", path: "/" },
              { label: "Project Guide", path: "/guide" },
              { label: "Templates", path: "/templates" },
              { label: "About", path: "/about" },
              { label: "AI Prompt", path: "/prompt" },
              { label: "Profile", path: "/profile" },
            ].map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl font-medium text-sm transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/20 to-amber-500/20 text-pink-400 border border-pink-500/30"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>}
                </button>
              );
            })}
          </div>

          {/* DIVIDER: QUICK ACTIONS */}
          <div className="border-t border-white/10 pt-4 flex flex-col gap-2.5">
            <span className="text-[11px] font-semibold uppercase text-gray-400 px-1 mb-1">
              Quick Actions
            </span>

            <button
              onClick={() => handleNavClick("/templates")}
              className="w-full bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              🎨 Browse Templates
            </button>

            <button
              onClick={() => handleNavClick("/profile")}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-2.5 px-4 rounded-xl text-sm border border-white/10 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              👤 My Profile
            </button>

            {user ? (
              <button
                onClick={handleLogout}
                className="w-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white font-medium py-2.5 px-4 rounded-xl text-sm border border-rose-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => handleNavClick("/login")}
                className="w-full bg-blue-500/20 hover:bg-blue-500 text-blue-300 hover:text-white font-medium py-2.5 px-4 rounded-xl text-sm border border-blue-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
