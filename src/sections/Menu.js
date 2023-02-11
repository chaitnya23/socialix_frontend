import React, { useContext, useEffect, useState } from "react";
import { MdDynamicFeed } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { AiOutlineUser } from "react-icons/ai";

import { Link } from "react-router-dom";
import { UserContext } from "../context/Context";
import Friends from "./Friends";



export default function Menu() {

  const { user } = useContext(UserContext);
  const [displayFriends, setdisplayFriends] = useState(false)

  return (
    <div className="ml-2 mt-2 col-span-1 bg-white shadow-lg w-full p-2">

      <Link to={`/profile/${user && user._id}`}>
        <div className="profile-box flex rounded-lg border-2 p-1 items-center hover:scale-105 hover:shadow-xl">
          <img src={user.profilePic!==""? user.profilePic : "/userNoImg.jfif"} alt="" className="rounded-full object-contain w-11 h-11" />
          <div className="ml-2 my-auto p-1">
          <p className="font-bold">{user && user.userName}</p>
            <p className="font-thin ">{user && user.name}</p>
          </div>
        </div>
      </Link>


      <div className="my-3 menu text-sm">
        <ul className="p-1">

          <Link to={'/feed'} >
            <li className="font-semibold mt-5 flex gap-4  p-2 cursor-pointer hover-effect rounded-md">
              <MdDynamicFeed size={22} />
              Feed
            </li>
          </Link>
          <li className="font-semibold mt-5 flex gap-4 p-2 cursor-pointer hover-effect rounded-md" onClick={()=>setdisplayFriends(true)}>
            <FaUserFriends size={22} />
            Friends
          </li>
       

          <Link to={`/profile/${user._id}`}>
            <li className="font-semibold mt-5 flex gap-4 p-2 cursor-pointer hover-effect rounded-md">
              <CgProfile size={22} />
              Profile
            </li>
          </Link>

          <Link to={`/requests`}>
          <li className="font-semibold mt-5 flex gap-4 p-2 cursor-pointer hover-effect rounded-md">
            <AiOutlineUser size={22} />
            Requests
          </li>
        </Link>

        </ul>
        <hr />
      </div>
      {displayFriends?<Friends setdisplayFriends={setdisplayFriends} user={user}/>:<></>}
    </div>
  );
}
