import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PlayingVideo from "./components/PlayingVideo";
import { useAuth } from "./context/AuthProvider"; // ✅ Corrected Import
import Loading from "./loader/Loading";
import SignUp from "./pages/SignUp"; // ✅ Fixed import
import Login from "./pages/Login"; // ✅ Fixed import
import ChannelManagement from "./pages/ChannelManagement";
import VideoUpload from "./pages/VideoUpload";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { loading, user } = useAuth();

  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <Routes>
        {/* Redirect users based on auth status */}
        <Route path="/" element={user ? <Navigate to="/home" replace /> : <Navigate to="/signup" replace />} />
        <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <SignUp />} />
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />

        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/channels" element={<ProtectedRoute><ChannelManagement /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute><VideoUpload /></ProtectedRoute>} />

        {/* Public Routes */}
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/video/:id" element={<PlayingVideo />} />

        {/* Catch-all Route: Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
