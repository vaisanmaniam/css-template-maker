// Activity Logging & Favorites Helper

export const logActivity = (type, title) => {
  try {
    const existing = JSON.parse(localStorage.getItem("recentActivity") || "[]");
    const newActivity = {
      id: Date.now() + Math.random(),
      type, // 'upload' | 'activate' | 'copy_key' | 'copy_snippet' | 'favorite' | 'avatar'
      title,
      timestamp: Date.now()
    };
    const updated = [newActivity, ...existing].slice(0, 10);
    localStorage.setItem("recentActivity", JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to log activity:", err);
  }
};

export const getRecentActivities = () => {
  try {
    return JSON.parse(localStorage.getItem("recentActivity") || "[]");
  } catch (err) {
    return [];
  }
};

// Favorites Helper
export const getFavoriteTemplateIds = () => {
  try {
    return JSON.parse(localStorage.getItem("favoriteTemplates") || "[]");
  } catch (err) {
    return [];
  }
};

export const toggleFavoriteTemplate = (templateId, templateName) => {
  try {
    const favorites = getFavoriteTemplateIds();
    const isFav = favorites.includes(templateId);
    let updated;
    if (isFav) {
      updated = favorites.filter(id => id !== templateId);
      logActivity("favorite", `Removed "${templateName || templateId}" from favorites`);
    } else {
      updated = [...favorites, templateId];
      logActivity("favorite", `Added "${templateName || templateId}" to favorites`);
    }
    localStorage.setItem("favoriteTemplates", JSON.stringify(updated));
    return !isFav;
  } catch (err) {
    console.error("Failed to toggle favorite:", err);
    return false;
  }
};

export const isTemplateFavorite = (templateId) => {
  const favorites = getFavoriteTemplateIds();
  return favorites.includes(templateId);
};

// Relative Time Helper
export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return "Just now";
  const now = Date.now();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);

  if (diffInSeconds < 30) return "Just now";
  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

  const date = new Date(timestamp);
  return `Today, ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
};
