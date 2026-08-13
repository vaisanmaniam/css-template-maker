import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser, updateUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import GlassBackground from "../components/GlassBackground";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/avatars/avatar1.png");
  const [customCSS, setCustomCSS] = useState("");
  const [templateTitle, setTemplateTitle] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const u = getCurrentUser();
    if (!u) return navigate("/login");
    setUser(u);
  }, [navigate]);

  const incrementUsage = () => {
    const updated = {
      ...user,
      stats: {
        ...user.stats,
        templatesUsed: user.stats.templatesUsed + 1,
        customizations: user.stats.customizations + 1,
        lastActive: new Date().toLocaleString()
      }
    };

    updateUser(updated);
    setUser(updated);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleTemplateUpload = () => {
    if (!templateTitle || !customCSS) {
      alert("Please fill in template title and CSS code");
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
    localStorage.setItem("userTemplates", JSON.stringify([...existing, newTemplate]));

    alert("Template Uploaded Successfully!");
    setTemplateTitle("");
    setCustomCSS("");
    setGithubLink("");
  };

  if (!user) return null;

  return (
    <>
      <GlassBackground />
      <div className="flex justify-center items-center min-h-screen p-6">
        <div className="glass-card w-full max-w-2xl text-center">

          <h2 className="text-3xl font-bold mb-4">Profile</h2>

          {/* Profile Avatar Section */}
          <div className="bg-white/20 p-6 rounded-xl mb-6">
            <h3 className="font-bold mb-4">Profile Avatar</h3>
            
            <div className="flex flex-col items-center">
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProfileImage(URL.createObjectURL(file));
                  }
                }}
                className="text-sm text-center"
              />
            </div>
          </div>

          <p className="mb-2"><b>User:</b> {user.username}</p>

          <div className="mt-6 space-y-2">
            <p>Templates Used: {user.stats.templatesUsed}</p>
            <p>Customizations: {user.stats.customizations}</p>
            <p>Last Active: {user.stats.lastActive}</p>
          </div>

          {/* Template Upload Section */}
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-xl mt-6 border border-purple-300/30 shadow-lg">
            <div className="flex items-center mb-4">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
              <h3 className="font-bold text-purple-900">Upload Your Template</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">Template Title</label>
                <input
                  type="text"
                  placeholder="Enter template name..."
                  className="w-full p-3 border border-purple-300 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  value={templateTitle}
                  onChange={(e) => setTemplateTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">CSS Code</label>
                <textarea
                  placeholder="Paste your CSS here..."
                  className="w-full p-3 border border-purple-300 rounded-lg h-32 bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none"
                  value={customCSS}
                  onChange={(e) => setCustomCSS(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-800 mb-1">GitHub Link (optional)</label>
                <input
                  type="text"
                  placeholder="https://github.com/username/repo"
                  className="w-full p-3 border border-purple-300 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                />
              </div>

              <button
                onClick={handleTemplateUpload}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-md"
              >
                🚀 Upload Template
              </button>
            </div>
          </div>

          {/* EXTRA FEATURE */}
          <div className="mt-6 p-4 bg-white/20 rounded-xl">
            <h4 className="font-bold">Performance</h4>
            <p>Activity Score: {user.stats.templatesUsed * 10}</p>
          </div>

          <button
            onClick={incrementUsage}
            className="glass-btn mt-4"
          >
            Simulate Usage 🚀
          </button>

          <Link
            to="/templates"
            className="glass-btn mt-3 inline-block"
          >
            Browse Templates
          </Link>

          <button
            onClick={handleLogout}
            className="glass-btn mt-3"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
