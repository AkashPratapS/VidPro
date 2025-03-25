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
            ? "fixed top-0 bottom-0 left-0 w-[75%] sm:w-[50%] bg-white z-40 h-screen transition-all duration-300 ease-in-out shadow-lg pt-16"
            : "hidden" 
        } xl:static xl:block xl:w-[250px] bg-white h-screen px-5 py-4 overflow-y-auto scrollbar-thin`}
      >
        {/* Sidebar Content */}
        <div className="space-y-6">
          {sidebarItems.map((group, index) => (
            <div key={index} className="mb-5">
              <h1 className="font-bold text-gray-700 text-lg">{group.groupName}</h1>
              {group.groupItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 px-4 py-3 w-full rounded-lg cursor-pointer hover:bg-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="w-8 flex justify-center text-2xl">{item.icon}</div>
                  <div className="flex-grow text-base text-gray-800">{item.name}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <hr className="my-4" />
        <span className="text-sm text-gray-600 font-semibold">
          About • Press • Copyright <br /> Contact us • Creators <br /> Advertise • Developers <br />
          <p className="mt-3">Terms • Privacy • Policy & Safety</p> How VidPro works <br /> Test new features
        </span>
        <p className="text-sm text-gray-500 mt-3">© 2024 VidPro</p>
      </div>

      {mobileShow ? <ModelOverlay /> : null}
    </>
  );
}

export default Sidebar;
