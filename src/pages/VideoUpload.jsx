import { useState, useEffect } from "react";
import API from "../api";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");

  useEffect(() => {
    API.get("/channels")
      .then((res) => setChannels(res.data))
      .catch((err) => console.error("Error fetching channels:", err));
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !url || !selectedChannel) return alert("Fill all fields!");

    try {
      const res = await API.post("/videos", {
        title,
        url,
        channelId: selectedChannel, // Assign video to channel
      });

      if (res.status === 201) {
        alert("Video uploaded successfully!");
        setTitle("");
        setUrl("");
        setSelectedChannel("");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleUpload} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Video URL"
          className="w-full p-2 border rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {/* Channel Selection */}
        <select
          className="w-full p-2 border rounded"
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
        >
          <option value="">Select a Channel</option>
          {channels.map((ch) => (
            <option key={ch._id} value={ch._id}>
              {ch.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
