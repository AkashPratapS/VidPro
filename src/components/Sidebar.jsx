import React from "react";
import { GoHome } from "react-icons/go";
import { SiYoutubeshorts, SiTrendmicro, SiYoutubemusic, SiYoutubestudio, SiYoutubekids } from "react-icons/si";
import { MdOutlineSubscriptions, MdHistory, MdOutlineWatchLater, MdPodcasts } from "react-icons/md";
import { PiUserSquareThin, PiFilmSlateLight, PiLightbulbLight } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CgMediaLive } from "react-icons/cg";
import { FaRegNewspaper, FaYoutube } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { BiVideo } from "react-icons/bi";
import { useUtils } from "../context/UtilsContext";

function Sidebar() {
  const { mobileShow, setMobileShow } = useUtils();

  const sidebarItems = [
    {
      groupName: "Home",
      groupItems: [
        { id: 1, name: "Home", icon: <GoHome /> },
        { id: 2, name: "Shorts", icon: <SiYoutubeshorts /> },
        { id: 3, name: "Subscriptions", icon: <MdOutlineSubscriptions /> },
      ],
    },
    {
      groupName: "You",
      groupItems: [
        { id: 1, name: "Your Channel", icon: <PiUserSquareThin /> },
        { id: 2, name: "History", icon: <MdHistory /> },
        { id: 3, name: "Playlists", icon: <MdOutlineSubscriptions /> },
        { id: 4, name: "Your Videos", icon: <BiVideo /> },
        { id: 5, name: "Watch Later", icon: <MdOutlineWatchLater /> },
        { id: 6, name: "Liked Videos", icon: <AiOutlineLike /> },
      ],
    },
    {
      groupName: "Explore",
      groupItems: [
        { id: 1, name: "Trending", icon: <SiTrendmicro /> },
        { id: 2, name: "Shopping", icon: <HiOutlineShoppingBag /> },
        { id: 3, name: "Music", icon: <SiYoutubemusic /> },
        { id: 4, name: "Films", icon: <PiFilmSlateLight /> },
        { id: 5, name: "Live", icon: <CgMediaLive /> },
        { id: 6, name: "Gaming", icon: <IoGameControllerOutline /> },
        { id: 7, name: "News", icon: <FaRegNewspaper /> },
        { id: 8, name: "Sport", icon: <TfiCup /> },
        { id: 9, name: "Courses", icon: <PiLightbulbLight /> },
        { id: 10, name: "Fashion & Beauty", icon: <PiLightbulbLight /> },
        { id: 11, name: "Podcasts", icon: <MdPodcasts /> },
      ],
    },
    {
      groupName: "More from VidPro",
      groupItems: [
        { id: 1, name: "VidPro Premium", icon: <FaYoutube /> },
        { id: 2, name: "VidPro Studio", icon: <SiYoutubestudio /> },
        { id: 3, name: "VidPro Music", icon: <SiYoutubemusic /> },
        { id: 4, name: "VidPro Kids", icon: <SiYoutubekids /> },
      ],
    },
  ];

  const ModelOverlay = () => (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30" onClick={() => setMobileShow(!mobileShow)}></div>
  );

  return (
    <>
      <div
        className={`${
          mobileShow
            ? "fixed top-0 bottom-0 left-0 transition-all duration-300 bg-white z-40 h-screen w-[80%] sm:w-[50%]" // Wider Mobile Sidebar
            : "hidden h-[calc(100vh-6.625rem)] w-[25%]" // Wider Desktop Sidebar
        } xl:static xl:block px-5 lg:px-7 overflow-y-scroll overflow-x-hidden scrollbar-thin shadow-lg`}
      >
        {/* Sidebar Content */}
        <div className="space-y-4">
          {sidebarItems.map((group, index) => (
            <div key={index} className="mb-5">
              <h1 className="font-bold text-lg text-gray-700">{group.groupName}</h1>
              {group.groupItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-5 px-3 py-2 w-full rounded-xl cursor-pointer hover:bg-gray-300 hover:shadow-md transition duration-300"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <span className="text-base w-full">{item.name}</span> {/* Ensures full word highlight */}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <br />
        <hr />
        <br />
        <span className="text-sm text-gray-600 font-semibold">
          About • Press • Copyright <br /> Contact us • Creators <br /> Advertise • Developers <br />
          <p className="mt-3">Terms • Privacy • Policy & Safety</p> How VidPro works <br /> Test new features
        </span>
        <br />
        <p className="text-sm text-gray-500 mt-3">© 2024 VidPro</p>
      </div>

      {mobileShow ? <ModelOverlay /> : null}
    </>
  );
}

export default Sidebar;
