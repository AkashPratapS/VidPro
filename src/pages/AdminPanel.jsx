import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/videos");
      const data = await res.json();
      setVideos(data);
    };
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/videos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setVideos(videos.filter((video) => video._id !== id));
    }
  };

  if (user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      <ul className="space-y-2">
        {videos.map((video) => (
          <li key={video._id} className="flex justify-between items-center p-2 border rounded">
            <span>{video.title}</span>
            <button
              onClick={() => handleDelete(video._id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
