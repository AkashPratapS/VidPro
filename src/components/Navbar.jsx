import React, { useEffect, useState } from "react";
import Avatar from 'react-avatar';
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../../public/logo2.png";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { IoArrowBack } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineBell } from "react-icons/ai";
import profile from "../../public/profile.png";
import { useNavigate, Link } from "react-router-dom";
import { useUtils } from "../context/UtilsContext";
import ProfileButton from "./ProfileButton";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState();
  const { setIsSidebar, isSidebar, mobileShow, setMobileShow } = useUtils();
  const [searchBar, setSearchBar] = useState(false);

  useEffect(() => {
    console.log({ isSidebar, mobileShow });
  }, [isSidebar]);

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

    setIsSidebar(!isSidebar);
  };

  if (searchBar) {
    return (
      <div className="flex justify-between fixed top-0 w-[100%] bg-white px-6 py-2 items-center">
        <IoArrowBack size={20} onClick={() => setSearchBar(!searchBar)} />
        <div className="flex flex-grow items-center mx-4">
          <div className="w-[100%] px-3 py-2 border border-gray-400 rounded-l-full">
            <input
              type="text"
              placeholder="Search"
              className="outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
              value={searchQuery}
            />
          </div>
          <button
            className="px-4 py-2 border-[1px] border-gray-400 bg-gray-100 rounded-r-full"
            onClick={() => searchQueryHandler("searchButton")}
          >
            <CiSearch size={"24px"} />
          </button>
        </div>
        <IoMdMic size={"42px"} className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" />
      </div>
    );
  }

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-white text-lg font-bold">VidPro</Link>
      <div className="hidden md:flex w-[35%] items-center">
        <div className="w-[100%] px-3 py-2 border border-gray-400 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="outline-none"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            value={searchQuery}
          />
        </div>
        <button
          className="px-4 py-2 border-[1px] border-gray-400 bg-gray-100 rounded-r-full"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={"24px"} />
        </button>
        <IoMdMic size={"42px"} className="ml-3 border rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" />
      </div>
      <div className="flex space-x-5 items-center">
        <IoIosSearch className="text-2xl xl:hidden" onClick={() => setSearchBar(!searchBar)} />
        <RiVideoAddLine className="text-2xl" />
        <AiOutlineBell className="text-2xl" />
        <Link to="/login">
          <Avatar src={profile} size="32" round={true} className="cursor-pointer" />
        </Link>
        <Link to="/signup" className="bg-blue-500 text-white p-2 rounded">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
