import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser, updateUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import GlassBackground from "../components/GlassBackground";
import TemplateWorkspaceModal from "../components/TemplateWorkspaceModal";
import { fetchAvailableTemplates } from "../api/templates";
import {
  getRecentActivities,
  getFavoriteTemplateIds,
  toggleFavoriteTemplate,
  formatRelativeTime,
  logActivity
} from "../utils/activity";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/avatars/avatar1.png");
  const [customCSS, setCustomCSS] = useState("");
  const [templateTitle, setTemplateTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [userTemplates, setUserTemplates] = useState([]);
  const [activities, setActivities] = useState([]);
  const [favoriteTemplates, setFavoriteTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) return navigate("/login");
    setUser(u);
    if (u.avatar) {
      setProfileImage(u.avatar);
    }
    loadUserTemplates(u.username);
    loadRecentActivities();
    loadFavoriteTemplates();
  }, [navigate]);

  const loadRecentActivities = () => {
    setActivities(getRecentActivities());
  };

  const loadFavoriteTemplates = async () => {
    try {
      const favIds = getFavoriteTemplateIds();
      const allTemplates = await fetchAvailableTemplates();
      const userTpls = JSON.parse(localStorage.getItem("userTemplates") || "[]");
      const combined = [...allTemplates, ...userTpls];
      const matched = combined.filter(t => favIds.includes(t.id || t.templateId || t.apiKey));
      setFavoriteTemplates(matched);
    } catch (err) {
      console.error("Error loading favorite templates:", err);
    }
  };

  const loadUserTemplates = (username) => {
    const existing = JSON.parse(localStorage.getItem("userTemplates") || "[]");
    const filtered = existing.filter(t => t.author === username || !t.author);
    setUserTemplates(filtered);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result;
      setProfileImage(base64Data);

      const updated = {
        ...user,
        avatar: base64Data
      };

      updateUser(updated);
      setUser(updated);
      toast.success("Profile photo updated!");
      logActivity("avatar", "Updated profile picture");
      loadRecentActivities();
    };

    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleTemplateUpload = () => {
    if (!templateTitle || !customCSS) {
      toast.error("Please fill in template title and CSS code");
      return;
    }

    const newTemplate = {
      id: Date.now(),
      name: templateTitle,
      css: customCSS,
      github: githubLink,
      type: "user",
      author: user.username
    };

    const existing = JSON.parse(localStorage.getItem("userTemplates") || "[]");
    const updatedTemplates = [...existing, newTemplate];
    localStorage.setItem("userTemplates", JSON.stringify(updatedTemplates));
    loadUserTemplates(user.username);

    toast.success("Template Uploaded Successfully!");
    logActivity("upload", `Uploaded ${templateTitle}`);
    loadRecentActivities();

    setTemplateTitle("");
    setCustomCSS("");
    setGithubLink("");
  };

  const handleRemoveFavorite = (t) => {
    const tId = t.id || t.templateId || t.apiKey;
    toggleFavoriteTemplate(tId, t.name);
    toast.success(`Removed "${t.name}" from favorites`);
    loadFavoriteTemplates();
    loadRecentActivities();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "upload": return "🚀";
      case "activate": return "✅";
      case "copy_key": return "🔑";
      case "copy_snippet": return "📋";
      case "favorite": return "⭐";
      case "avatar": return "👤";
      default: return "⚡";
    }
  };

  if (!user) return null;

  return (
    <>
      <GlassBackground />
      <div className="min-h-screen py-10 px-4 flex justify-center items-center relative z-10">
        <div className="w-full max-w-[500px] bg-white/30 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-6 sm:p-8 text-gray-800 flex flex-col gap-6">

          {/* PAGE TITLE & AVATAR SECTION */}
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">
              User Profile
            </h2>

            <div className="relative group mb-3">
              <img
                src={profileImage}
                alt={user.username}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white/90 shadow-xl ring-4 ring-pink-500/20 transition-all duration-300 group-hover:scale-105"
              />
              <label className="absolute bottom-1 right-1 bg-gradient-to-r from-pink-500 to-amber-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>

            <h3 className="text-xl font-extrabold text-gray-900">{user.username}</h3>
            <span className="inline-block mt-1 px-3 py-1 bg-pink-500/10 text-pink-700 font-medium text-xs rounded-full border border-pink-500/20">
              @{user.username.toLowerCase()}
            </span>
          </div>

          {/* USER STATS GRID */}
          <div className="grid grid-cols-3 gap-3 bg-white/40 backdrop-blur-md p-4 rounded-2xl border border-white/50 text-center shadow-inner">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Templates</span>
              <span className="text-lg font-bold text-gray-900 mt-1">{userTemplates.length}</span>
            </div>
            <div className="flex flex-col border-x border-gray-200/50 px-2">
              <span className="text-xs text-gray-500 font-medium">Favorites</span>
              <span className="text-lg font-bold text-gray-900 mt-1">{favoriteTemplates.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Activities</span>
              <span className="text-lg font-bold text-pink-600 mt-1">{activities.length}</span>
            </div>
          </div>

          {/* FAVORITE TEMPLATES SECTION */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                  Favorite Templates ({favoriteTemplates.length})
                </h4>
              </div>
            </div>

            {favoriteTemplates.length === 0 ? (
              <div className="text-center py-6 bg-white/30 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">⭐ No favorite templates saved yet</p>
                <p className="text-[11px] text-gray-400 mt-1">Click the star on any template in the gallery to save it here</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 max-h-56 overflow-y-auto pr-1">
                {favoriteTemplates.map((tpl) => (
                  <div key={tpl.id || tpl.templateId || tpl.apiKey} className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-xs flex justify-between items-center hover:border-pink-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {tpl.name.split(" ")[0][0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-gray-900">{tpl.name}</span>
                        <span className="text-[11px] text-pink-600 font-medium">{tpl.category || "Custom"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedTemplate(tpl)}
                        className="px-2.5 py-1 bg-pink-500 text-white text-xs font-semibold rounded-lg hover:bg-pink-600 transition-colors cursor-pointer"
                      >
                        Open Workspace
                      </button>
                      <button
                        onClick={() => handleRemoveFavorite(tpl)}
                        className="p-1 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer text-sm"
                        title="Remove from favorites"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RECENT ACTIVITY TIMELINE SECTION */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🕒</span>
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                Recent Activity
              </h4>
            </div>

            {activities.length === 0 ? (
              <div className="text-center py-6 bg-white/30 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">No recent activity recorded yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
                {activities.map((act) => (
                  <div key={act.id} className="p-2.5 bg-white/80 rounded-xl border border-gray-200/80 shadow-xs flex items-center gap-3">
                    <span className="text-base">{getActivityIcon(act.type)}</span>
                    <div className="flex-1 flex justify-between items-center gap-2">
                      <span className="font-medium text-xs text-gray-800 truncate">{act.title}</span>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap font-medium">
                        {formatRelativeTime(act.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* UPLOAD TEMPLATE FORM */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-amber-500"></div>
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Upload Custom Template</h4>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Template Title</label>
                <input
                  type="text"
                  placeholder="e.g. Neon Dashboard"
                  className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:bg-white transition-all"
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">CSS Code</label>
                <textarea
                  placeholder="/* Paste your CSS stylesheet here */"
                  className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 h-28 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:bg-white transition-all resize-none font-mono text-xs"
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">GitHub Repository (Optional)</label>
                <input
                  type="text"
                  placeholder="https://github.com/username/repo"
                  className="w-full px-3 py-2.5 bg-white/80 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/40 focus:bg-white transition-all"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>

              <button
                onClick={handleTemplateUpload}
                className="w-full mt-1 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                🚀 Upload Template
              </button>
            </div>
          </div>

          {/* DEDICATED UPLOADED TEMPLATES SECTION */}
          <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/50 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                Uploaded Templates ({userTemplates.length})
              </h4>
            </div>

            {userTemplates.length === 0 ? (
              <div className="text-center py-6 bg-white/30 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500">No custom templates uploaded yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1">
                {userTemplates.map((tpl) => (
                  <div key={tpl.id} className="p-3 bg-white/80 rounded-xl border border-gray-200/80 shadow-xs flex justify-between items-center hover:border-pink-300 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-gray-900">{tpl.name}</span>
                      <span className="text-[11px] text-gray-500 font-mono">
                        {tpl.css ? `${tpl.css.split('\n').length} lines CSS` : 'Custom Style'}
                      </span>
                    </div>
                    {tpl.github && (
                      <a
                        href={tpl.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-pink-600 hover:underline font-medium"
                      >
                        GitHub 🔗
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex flex-col gap-2.5 pt-2">
            <Link
              to="/templates"
              className="w-full bg-white/80 hover:bg-white text-gray-800 py-3 rounded-xl font-bold text-sm text-center shadow-xs border border-gray-200/80 hover:border-pink-300 transition-all duration-200"
            >
              🎨 Browse Templates
            </Link>

            <button
              onClick={handleLogout}
              className="w-full bg-rose-500/10 hover:bg-rose-500 text-rose-700 hover:text-white py-3 rounded-xl font-bold text-sm text-center border border-rose-500/20 transition-all duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>

        </div>
      </div>

      {/* WORKSPACE MODAL IF OPENED FROM FAVORITES */}
      {selectedTemplate && (
        <TemplateWorkspaceModal
          template={selectedTemplate}
          onClose={() => setSelectedTemplate(null)}
        />
      )}
    </>
  );
}
