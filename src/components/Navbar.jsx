import React, { useEffect, useState } from "react";
import Avatar from 'react-avatar';
import { AiOutlineMenu } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useUtils } from "../context/UtilsContext";
import ProfileButton from "./ProfileButton";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setIsSidebar, isSidebar, mobileShow, setMobileShow } = useUtils();
  const [searchBar, setSearchBar] = useState(false);
  const navigate = useNavigate();

  const searchQueryHandler = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
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

  if (searchBar) {
    return (
      <div className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 items-center shadow-md">
        <IoArrowBack size={20} onClick={() => setSearchBar(!searchBar)} className="cursor-pointer" />
        <div className="flex flex-grow items-center mx-4">
          <div className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-l-full">
            <input
              type="text"
              placeholder="Search"
              className="outline-none bg-transparent w-full focus:ring-2 focus:ring-blue-500 px-2"
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
        </div>
        <IoMdMic size={42} className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-200" />
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu className="text-2xl text-white cursor-pointer" onClick={handleSidebar} />
        <Link to="/">
          <img src="/logo2.png" alt="Logo" className="h-8" />
        </Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex w-[35%] items-center">
        <div className="w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none bg-transparent w-full focus:ring-2 focus:ring-blue-500 px-2"
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
        <IoMdMic size={42} className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 transition duration-200" />
      </div>

      {/* Right Section */}
      <div className="flex space-x-5 items-center text-white">
        <IoIosSearch className="text-2xl xl:hidden cursor-pointer" onClick={() => setSearchBar(!searchBar)} />
        <RiVideoAddLine className="text-2xl cursor-pointer" />
        <AiOutlineBell className="text-2xl cursor-pointer" />
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navbar;
