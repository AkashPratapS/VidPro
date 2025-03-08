import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome, {user?.username}</h1>
      <p>You can create channels and upload videos.</p>
    </div>
  );
};

export default UserDashboard;
