import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useUtils } from "../context/UtilsContext";
import ProfileButton from "./ProfileButton";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const { setIsSidebar, isSidebar, mobileShow, setMobileShow } = useUtils();
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery.trim().length > 0) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  const handleSidebar = () => {
    if (window.innerWidth <= 1280) {
      setIsSidebar(!isSidebar);
      setMobileShow(!mobileShow);
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-3">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu className="text-2xl text-gray-800 cursor-pointer" onClick={handleSidebar} />
        <Link to="/">
          <img src="/logo2.png" alt="Logo" className="h-8 object-contain" onError={(e) => e.target.style.display = "none"} />
        </Link>
      </div>

      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex w-[40%] items-center">
        <div className="flex-grow px-4 py-2 border border-gray-300 bg-gray-100 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="px-4 py-2 border border-gray-300 bg-gray-200 hover:bg-gray-300 rounded-r-full"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={24} />
        </button>
        <IoMdMic className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-200 text-gray-700" size={42} />
      </div>

      {/* Right Section */}
      <div className="flex space-x-5 items-center text-gray-800">
        <IoIosSearch className="text-2xl xl:hidden cursor-pointer" onClick={() => setSearchBar(!searchBar)} />
        <RiVideoAddLine className="text-2xl cursor-pointer" />
        <AiOutlineBell className="text-2xl cursor-pointer" />
        <ProfileButton />
      </div>

      {/* Search Bar (Mobile) */}
      {searchBar && (
        <div className="absolute top-0 left-0 w-full h-full bg-white flex items-center px-4 py-3 shadow-md">
          <IoArrowBack size={24} className="cursor-pointer" onClick={() => setSearchBar(false)} />
          <div className="flex-grow mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
            />
          </div>
          <button className="ml-2 text-gray-600" onClick={() => searchQueryHandler("searchButton")}>
            <CiSearch size={24} />
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
