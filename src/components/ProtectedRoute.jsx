import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function ProtectedRoute({ children }) {
  const auth = useAuth(); // ✅ Ensure `useAuth` is returning a valid object

  if (!auth || auth.loading) return <p>Loading...</p>; // ✅ Handle undefined context
  if (!auth.user) return <Navigate to="/login" replace />; // Redirect if not authenticated

  return children;
}
