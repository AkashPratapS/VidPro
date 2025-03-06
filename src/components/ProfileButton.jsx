import { useState, useEffect } from "react";
import { getProfile, logoutUser } from "../api"; // Ensure API functions are implemented
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
    <div>
      {user ? (
        <>
          <Link to="/profile" className="text-white p-2">
            Welcome, {user.email}
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white p-2 rounded ml-2">
            Logout
          </button>
        </>
      ) : (
        <Link to="/signup" className="bg-blue-500 text-white p-2 rounded">
          Sign Up
        </Link>
      )}
    </div>
  );
};

export default ProfileButton;
