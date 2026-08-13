export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  if (users.find(u => u.username === user.username)) {
    throw new Error("User already exists");
  }

  users.push({
    ...user,
    stats: {
      templatesUsed: 0,
      customizations: 0,
      lastActive: new Date().toLocaleString()
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
};

export const loginUser = (username, password) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) throw new Error("Invalid credentials");

  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const updateUser = (updatedUser) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const newUsers = users.map(u =>
    u.username === updatedUser.username ? updatedUser : u
  );

  localStorage.setItem("users", JSON.stringify(newUsers));
  localStorage.setItem("currentUser", JSON.stringify(updatedUser));
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};
