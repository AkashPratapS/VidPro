import { useState, useEffect } from "react";
import { getProfile, logoutUser } from "../api";
import { Link } from "react-router-dom";

const ProfileButton = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-3">
          <Link to="/profile" className="text-gray-800 font-medium">
            Welcome, {user.email}
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-red-600 shadow-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-4 py-2 text-white font-medium border bg-purple-600 border-purple-600 rounded-full transition duration-300 hover:bg-gray-200 shadow-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-full transition duration-300 hover:bg-blue-600 shadow-md"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
