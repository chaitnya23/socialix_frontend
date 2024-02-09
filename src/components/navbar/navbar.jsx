import React, { useContext } from "react";
import {
  COLORS,
  MdHomeFilled,
  FaUser,
  MdInfo,
  MdOutlineLogout,
  IoMdSearch,
  GiHamburgerMenu,
  sidebarLinks,
  IoIosLogOut,
  routes,
  FaUserFriends,
} from "../../utils";
import userImg from "../../asset/user-img.png";
import SearchResultContainer from "../search-result/search-result-container";
import { useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../context/Context";
import './navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { isMobileScreen } from "../../utils/lib/app-utils";

export default function Navbar() {

  const navigate = useNavigate();

  const [searchParam, setSearchParam] = useState("");
  const [displayResults, setdisplayResults] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { user, setuser } = useContext(UserContext);

  const handleLogout = () => {
    setuser(null);
    localStorage.removeItem('token');
    navigate(routes.auth);
  }
  return (

    <div
      className={`h-full  p-4 w-full rounded-xl `}
      style={{ backgroundColor: COLORS.dark }}
    >

      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl text-white gradient-text">Socialix</p>
        <div className="md:hidden block " onClick={() => setOpenMenu(!openMenu)}>
          <GiHamburgerMenu color={'white'} size={25} />
        </div>
      </div>

      <div className={`md:block ${openMenu ? "block" : "hidden"} mt-3`}>

        <Link to={`/profile/${user ? user._id : ""}`}>
          <div className="flex gap-5 p-1 rounded-xl item-center my-2  cursor-pointer hover:bg-gray-700">
            <div className="profile-pic w-1/4">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={user && user.profilePic}
                alt=""
              />
            </div>

            <div className="user-info  my-auto">
              <p className="font-semibold  text-white">{user && user.name}</p>
              <p
                className={`font-semibold text-sm `}
                style={{ color: COLORS.gray }}
              >
                @{user && user.userName}
              </p>
            </div>

          </div>

        </Link>
        <div>

          {
            sidebarLinks.map((link) => {
              return (
                <Link to={link.route}>
                  <div className="sidebar-box " >
                    {link.icon}
                    <p className="text-semibold text hover:text-black" style={{ color: COLORS.gray }} >{link.name}</p>
                  </div>
                </Link>
              )
            })
          }
          {
            isMobileScreen() ? (
              <Link to={'/friends'}>
                <div className="sidebar-box " onClick={handleLogout} >
                  <FaUserFriends size={25} color={COLORS.gray} />
                  <p className="text-semibold text hover:text-black" style={{ color: COLORS.gray }} >Friends</p>
                </div>
              </Link>
            ) : null
          }
          {
            isMobileScreen() ? (
              <Link to={'/requests'}>
                <div className="sidebar-box " onClick={handleLogout} >
                  <p className="text-semibold text hover:text-black" style={{ color: COLORS.gray }} >Requests</p>
                </div>
              </Link>
            ) : null
          }
          <div className="sidebar-box " onClick={handleLogout} >
            <IoIosLogOut size={25} color={COLORS.gray} />
            <p className="text-semibold text hover:text-black" style={{ color: COLORS.gray }} >Log out</p>
          </div>
          <div className=" w-full h-[15rem] rounded overflow-hidden">
            <video src={require('../../asset/Socialix-intro-vid.mp4')} autoPlay loop className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const SearchBox = ({ searchParam, setSearchParam, setdisplayResults }) => {

  return (
    <div
      className={` p-4 rounded-xl flex justify-around gap-3 w-[30%] cursor-pointer`}
      style={{ backgroundColor: COLORS.dark }}
    >
      <input
        type="text"
        className="outline-none border-0 w-[8rem] bg-transparent text-white"
        placeholder="Search"
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <IoMdSearch size={25} color={COLORS.gray} onClick={() => setdisplayResults(true)} />
    </div>
  );
};
