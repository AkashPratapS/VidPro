import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Video from "./Video.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import ListItems from "./ListItems.jsx";

function Home() {
  const { data, loading } = useAuth();

  return (
    <div className="flex mt-5">
      <Sidebar />
      <div className="h-[calc(100vh-6.625rem)] overflow-y-scroll overflow-x-hidden flex-1">
        <ListItems />

        {/* ✅ Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-full">
            <h3 className="text-gray-500 text-lg">Loading videos...</h3>
          </div>
        )}

        {/* ✅ Video Grid */}
        {!loading && data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-5">
            {data.map((item) =>
              item.type === "video" && item.id?.videoId ? (
                <Video key={item.id.videoId} video={item.video} />
              ) : null
            )}
          </div>
        ) : (
          // ✅ Handle No Videos Case
          !loading && (
            <div className="text-center text-gray-500 mt-10">
              <h3>No videos found</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
