import React from "react";
import { Link } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";

function Video({ video }) {
  if (!video) {
    console.warn("⚠️ Video object is undefined");
    return null;
  }

  console.log("✅ Rendering Video Component with:", video);

  return (
    <div>
      <Link to={video?.videoId ? `/video/${video.videoId}` : "#"}>
        <div className="flex flex-col">
          {/* Thumbnail & Title */}
          <div className="relative h-48 md:h-56 rounded-xl hover:rounded-none duration-200 overflow-hidden">
            <img 
              className="h-full w-full object-cover" 
              src={video?.thumbnails?.[0]?.url || "/default-thumbnail.jpg"} 
              alt={video?.title || "Video Thumbnail"} 
              loading="lazy"
            />
            {video?.lengthSeconds && <Time time={video.lengthSeconds} />} 
          </div>
          
          {/* Channel logo & title */}
          <div className="flex mt-3 space-x-2">
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                <img 
                  className="h-full w-full object-cover" 
                  src={video?.author?.avatar?.[0]?.url || "/default-avatar.png"} 
                  alt={video?.author?.title || "Channel Avatar"} 
                  loading="lazy"
                />
              </div>
            </div>
            
            <div>
              <span className="text-sm font-bold line-clamp-2">
                {video?.title || "Untitled Video"}
              </span>
              <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-500">
                {video?.author?.title || "Unknown Channel"}
                {video?.author?.badges?.[0]?.type === "VERIFIED_CHANNEL" && (
                  <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                )}
              </span>
              <div className="flex text-gray-500 text-[12px]">
                <span>
                  {video?.stats?.views !== undefined
                    ? `${abbreviateNumber(video.stats.views, 2)} views`
                    : "No views"}
                </span>
                <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">.</span>
                <span>{video?.publishedTimeText || "Unknown date"}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Video;
