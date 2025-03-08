import React, { useEffect, useState } from "react";
import axios from "../api";

const AdminDashboard = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/videos").then((res) => setVideos(res.data));
  }, []);

  const deleteVideo = (id) => {
    axios.delete(`/admin/video/${id}`).then(() => {
      setVideos(videos.filter((video) => video._id !== id));
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <ul>
        {videos.map((video) => (
          <li key={video._id} className="flex justify-between bg-gray-200 p-3 my-2 rounded-lg">
            <span>{video.title}</span>
            <button onClick={() => deleteVideo(video._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
