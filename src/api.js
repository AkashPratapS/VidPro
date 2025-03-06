const API_BASE_URL = "http://localhost:5000";

export const signUpUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token); // Store JWT in localStorage
  }
  return data;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.json();
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
