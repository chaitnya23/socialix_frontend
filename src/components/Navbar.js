import axios from "axios";
import React, { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUser ,AiOutlineHome  ,AiOutlineSearch ,AiOutlineBell} from "react-icons/ai";

import { Link } from "react-router-dom";
import SearchResult from "./SearchResult";
import { UserContext } from "../context/Context";


export default function Navbar() {

  const [search, setsearch] = useState("");
  const [displayResult, setdisplayResult] = useState(false);
  const {user} = useContext(UserContext);

  const handlelogout = async () => {
    try {

      localStorage.removeItem("user")
       await axios.get('/api/auth/logout');

    } catch (error) {
      console.log(error.message);
    }
  }

  //search handle
  const handleUserSearch = () => {

    setdisplayResult(true);
  }

  return (
    <>
      <nav className="shadow p-1 w-full  mb-1 bg-blue-300">
        <div className="flex justify-between">

          <div className="logo">
            <h1 className="font-bold text-xl border-2 border-black bg-transparent px-2 ">Socialix</h1>
          </div>

          <div className="search md:p-1 px-3 bg-gray-100 text-sm rounded-full w-fit   border-1 flex ">
            <input type="text" className=" bg-transparent outline-none md:w-[18rem] w-[5rem]" onChange={(e) => setsearch(e.target.value)} name="search" placeholder="Search" id="" />
            <AiOutlineSearch size={21} style={{ margin: "auto", cursor: "pointer" }} onClick={handleUserSearch} />
          </div>

          <div className="flex gap-3">
          
            <Link to={'/'}>
              <AiOutlineHome size={22} style={{ margin: "auto", marginTop: "8px", cursor: "pointer" }}  />
            </Link>

            <Link to={'/requests'}>
              <p className="w-5 text-xs p-1 font-bold h-5 text-center ml-3 text-semibold text-white rounded-full bg-red-400 absolute">{user.Requests&&user.Requests.length}</p>
              <AiOutlineUser  size={22} style={{ margin: "auto", marginTop: "8px", cursor: "pointer" }}  />
            </Link>
            
            <Link to={'/notifications'}>

              <AiOutlineBell size={22} style={{ margin: "auto", marginTop: "8px", cursor: "pointer" }}  />
            </Link>

            <Link to={'/login'}>
              <BiLogOut size={22} style={{ margin: "auto", marginTop: "8px", cursor: "pointer" }} onClick={handlelogout} />
            </Link>

          </div>

        </div>
      </nav>
      {
        displayResult &&

        <SearchResult search={search} setdisplayResult={setdisplayResult} />
      }

    </>
  );
}
