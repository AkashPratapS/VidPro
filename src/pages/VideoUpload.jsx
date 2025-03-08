import React, { useState, useEffect } from "react";
import API from "../api";

const VideoUpload = () => {
  const [videos, setVideos] = useState([]);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    API.get("/videos")
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const uploadVideo = async () => {
    if (!videoFile) return;
    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const res = await API.post("/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideos([...videos, res.data]);
      setVideoFile(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await API.delete(`/videos/${id}`);
      setVideos(videos.filter((video) => video._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Upload & Manage Videos</h1>
      <div className="flex mt-4">
        <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} className="border p-2" />
        <button onClick={uploadVideo} className="bg-green-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </div>
      <ul className="mt-4">
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

export default VideoUpload;
