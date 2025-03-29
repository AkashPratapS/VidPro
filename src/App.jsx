import React from "react";
import "./index.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import PlayingVideo from "./components/PlayingVideo";
import { useAuth } from "./context/AuthProvider";
import Loading from "./loader/Loading";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ChannelManagement from "./pages/ChannelManagement";
import VideoUpload from "./pages/VideoUpload"; // ✅ Fixed Import
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { loading } = useAuth();

  return (
    <div>
      {loading && <Loading />}
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/search/:searchQuery" element={<Search />} />
        <Route path="/video/:id" element={<PlayingVideo />} />
        <Route path="/channels" element={<ChannelManagement />} />
        <Route path="/upload" element={<VideoUpload />} /> {/* ✅ Fixed Route */}
      </Routes>
    </div>
  );
}

export default App;
