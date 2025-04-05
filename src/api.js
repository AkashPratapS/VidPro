import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // ✅ Send cookies with requests
});

// ✅ Automatically attach token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Handle Unauthorized Errors Automatically
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser(); // ✅ Clear token and redirect on auth failure
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ Authentication APIs
export const signUpUser = async (username, email, password) => {
  try {
    const { data } = await API.post("/auth/register", { username, email, password });
    localStorage.setItem("token", data.token); // ✅ Store token after signup
    return data;
  } catch (error) {
    console.error("Signup Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};


export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    localStorage.setItem("token", data.token); // ✅ Store JWT
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

// ✅ Fetch user profile (Fixes Axios handling)
export const getProfile = async () => {
  try {
    const { data } = await API.get("/profile");
    return data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch profile");
  }
};

// ✅ Logout User & Clear Token
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // ✅ Redirect to login page
};

// ✅ Export API instance for further use
export default API;
