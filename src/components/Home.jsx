import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./Video.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import ListItems from "./ListItems.jsx";
import API from "../api"; // Assuming you have API helper for fetching

function Home() {
  const { data: videos = [], loading } = useAuth();
  const [channels, setChannels] = useState([]);
  

  useEffect(() => {
    console.log("Fetched data:", videos);
    if (videos.length > 0) {
      console.log("Sample video object:", JSON.stringify(videos[0], null, 2));
    }
  }, [videos]);

  // Fetch all channels when component mounts
  useEffect(() => {
    API.get("/channels")
      .then((res) => setChannels(res.data))
      .catch((err) => console.error("Error fetching channels:", err));
  }, []);

  return (
    <div className="flex mt-20">
      <Sidebar />
      <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden flex-1 p-5">
        <ListItems />

        {/* ✅ Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-full">
            <h3 className="text-gray-500 text-lg">Loading videos...</h3>
          </div>
        )}

        {/* ✅ Grouping Videos by Channels */}
        {!loading && videos?.length > 0 ? (
          channels.map((channel) => {
            const channelVideos = videos.filter(
              (vid) => vid.channelId === channel._id
            );

            return channelVideos.length > 0 ? (
              <div key={channel._id} className="mb-6">
                <h2 className="text-lg font-semibold mb-2">{channel.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {channelVideos.map((video) => (
                    <Video key={video.videoId} video={video} />
                  ))}
                </div>
              </div>
            ) : null;
          })
        ) : (
          !loading && (
            <div className="text-center text-gray-500 mt-10">
              <h3>No videos available</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}

console.log("✅ Home is rendering");

export default Home;
