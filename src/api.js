import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const API = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true, // If using cookies for authentication
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

// ✅ Authentication APIs
export const signUpUser = async (username, email, password) => {
  try {
    const { data } = await API.post("/auth/register", { username, email, password });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to sign up");
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await API.post("/auth/login", credentials);
    localStorage.setItem("token", data.token); // Store JWT
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to log in");
  }
};

// ✅ Fixed `getProfile` to use Axios properly
export async function getProfile() {
  try {
    const { data } = await API.get("/profile"); // ✅ Use Axios
    return data;
  } catch (error) {
    console.error("Profile Fetch Error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || "Failed to fetch profile");
  }
}


export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ✅ Export API instance for further use
export default API;
