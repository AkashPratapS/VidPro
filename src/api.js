import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // If using cookies for authentication
});

// ✅ Automatically attach token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Authentication APIs
export const signUpUser = async (username, email, password) => {
  try {
    const { data } = await API.post("/auth/signup", { username, email, password });
    return data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    localStorage.setItem("token", data.token); // Store JWT
    return data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

// ✅ Fixed profile fetching with axios and correct endpoint
export const getProfile = async () => {
  try {
    const { data } = await API.get("/auth/profile");
    return data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch profile");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ✅ Export API instance for further use
export default API;
