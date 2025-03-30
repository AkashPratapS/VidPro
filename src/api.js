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

export async function getProfile() {
  try {
    const token = localStorage.getItem('authToken'); // Retrieve token from storage
    const response = await fetch('/api/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in headers
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Please log in again.');
      }
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Profile Fetch Error:', error);
    throw error;
  }
}

export const logoutUser = () => {
  localStorage.removeItem("token");
};

// ✅ Export API instance for further use
export default API;
