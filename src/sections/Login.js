import React, { useContext, useState } from "react";

import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import {UserContext} from "../context/Context";
import { toast } from "react-toastify";



export default function Login() {
  
  //for navigation
  const navigate = useNavigate();

  // states
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);

  //context
  const {user ,setuser} = useContext(UserContext);
  
  
  //handle login feature function
  const handleLogin = async()=>{
 
    try {
      
      const {data} = await axios.post("https://socialix-social-media-backend.vercel.app/api/auth/login",{
        userName ,password
      })

      console.log("user" ,user);
      localStorage.setItem("user" ,JSON.stringify(data))
      
      if(data){
        setuser(data);
        
        navigate("/");
      }
      //navigate to main page
      
    } catch (error) {
      navigate('/login');
      setuserName("");
      setpassword("");
      toast.error("wrong password or username !! try again")
      console.log(error.message);
      //show toast of error
    }
  }



  return (

  
    <div className="h-screen flex auth-page justify-center align-middle items-center">


      <div className="login-box bg-white shadow-lg rounded border-l-4 border-blue-300 md:flex p-5 md:w-1/2 w-[90%]">
        <div className="img-sec md:w-[40%] ">
          <img src="/logo-lg.png" className="h-full" alt="" />
        </div>

        <div className="inputs md:w-[60%] ml-4 p-2">

          <p className="text-2xl font-bold my-3">Login And Socialize....</p>

          <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 flex">
            <FaUserAlt size={20} style={{ margin: "auto" }} />
            <input
              type="text"
              className="outline-none p-2 w-[90%]"
              placeholder="Enter  Username"
              onChange={(e)=>setuserName(e.target.value)}
            />
          </div>
          <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 flex">
            <RiLockPasswordFill size={20} style={{ margin: "auto" }} />
            <input
              type="password"
              className="outline-none p-2 w-[90%]"
              placeholder="Enter  Password"
              onChange={(e)=>setpassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin} className="p-1 my-8 rounded-md bg-blue-400 font-bold w-full text-white hover:bg-blue-600 shadow ">
            Login
          </button>
          <Link to="/signup">
          <p className="my-4 p-1 text-blue-600">new here ? sign up now</p>
          </Link>
        </div>
      </div>

    

    </div>
 
  );
}
