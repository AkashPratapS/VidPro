import React, { useState, useEffect } from "react";
import API from "../api";

const ChannelManagement = () => {
  const [channels, setChannels] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    API.get("/channels")
      .then((res) => setChannels(res.data))
      .catch((err) => console.error("Error fetching channels:", err));
  }, []);

  const createChannel = async () => {
    if (!channelName.trim()) return;

    try {
      const res = await API.post("/channels", { name: channelName });
      setChannels([...channels, res.data]); // Add new channel to list
      setChannelName(""); // Clear input
    } catch (err) {
      console.error("Error creating channel:", err);
    }
  };

  const deleteChannel = async (id) => {
    try {
      await API.delete(`/channels/${id}`);
      setChannels(channels.filter((ch) => ch._id !== id)); // Remove from list
    } catch (err) {
      console.error("Error deleting channel:", err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Manage Your Channels</h1>
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Channel Name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md"
        />
        <button onClick={createChannel} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          Create
        </button>
      </div>
      <ul className="mt-4">
        {channels.map((channel) => (
          <li key={channel._id} className="flex justify-between bg-gray-200 p-3 my-2 rounded-lg">
            <span>{channel.name}</span>
            <button onClick={() => deleteChannel(channel._id)} className="bg-red-500 text-white px-3 py-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelManagement;
