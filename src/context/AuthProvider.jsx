import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api"; // ✅ Ensure this API call works

// ✅ Create AuthContext with default value to avoid undefined errors
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Custom hook for authentication
export function useAuth() {
  return useContext(AuthContext);
}
