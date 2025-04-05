import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // ✅ Session-based auth requires this
});

// ✅ Handle Unauthorized Errors Automatically
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Authentication APIs (no token usage anymore)
export const signUpUser = async (username, email, password) => {
  try {
    const { data } = await API.post("/auth/register", { username, email, password });
    return data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

export const getProfile = async () => {
  try {
    const { data } = await API.get("/profile");
    return data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch profile");
  }
};

export const logoutUser = () => {
  window.location.href = "/login";
};

export default API;
