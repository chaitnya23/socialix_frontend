import React, { useContext, useState } from 'react'

import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAddAPhoto } from "react-icons/md";
import Loader from '../components/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

  const [loading, setloading] = useState(false);
  const [userDetails, setuserDetails] = useState({
    name:"" ,userName:"" ,password:"",profilePic:""
  });

  //context
  const {setuser} = useContext(UserContext);

  const navigate = useNavigate();

  const handleSignup = async()=>{

    try {
      setloading(true);
      const {data} = await axios.post('/api/auth/signup' ,userDetails);

      setloading(false);
      setuser(data);
      navigate('/')
    } catch (error) {

      console.log(error.message);
      setloading(false);

    }
  }

  const handleOnchange = (e)=>{

    const name = e.target.name;
    const value = e.target.value;

    setuserDetails({...userDetails ,[name]:value});
  }

  const handleFileChange = async (file) => {
    if (file === undefined) {
        window.alert("something went wrong!! upload ur profile");
        throw new Error("file not selected!!");
    }
    try {
      const toastId = toast.loading("loading your profile wait ....");

        if (
            file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "image/jpg"
        ) {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "socialix");
            data.append("cloud_name", "dkvpwutkh");


            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dkvpwutkh/image/upload",
                data
            );
            setuserDetails({ ...userDetails, profilePic: res.data.url });
            console.log(res.data);
            
            toast.dismiss(toastId);


        }
    } catch (error) {

        console.log(error.message);

        window.alert("something went wrong!!");
    }
};

  return (

    <div className="h-fit flex auth-page justify-center align-middle items-center">

      <div className="signup-box bg-white shadow-lg rounded border-r-4 border-purple-300 my-auto md:flex p-5 md:w-3/4 w-[90%]">
        <div className="img-sec md:w-[40%] ">
          <img src="/logo-lg.png" className="md:h-full h-[20%]" alt="" />
        </div>

        <div className="inputs md:w-[60%] ml-4 p-2">

          <p className="text-2xl font-bold my-3">Signup And Socialize....</p>

          <div className="rounded-sm mt-10 w-full border-b-2 border-purple-300 flex">
            <FaUserAlt size={20} style={{ margin: "auto" }} />
            <input
              type="text"
              className="outline-none p-2 w-[90%]"
              placeholder="*name"
              name="name"
              value={userDetails.name}
              onChange={handleOnchange}
            />
          </div>
          <div className="rounded-sm mt-10 w-full border-b-2 border-purple-300 flex">
            <FaUserAlt size={20} style={{ margin: "auto" }} />
            <input
              type="text"
              className="outline-none p-2 w-[90%]"
              placeholder="*userName"
              name='userName'
              value={userDetails.userName}
              onChange={handleOnchange}

            />
          </div>
          <div className="rounded-sm mt-10 w-full border-b-2 border-purple-300 flex">
          <RiLockPasswordFill size={20} style={{ margin: "auto" }} />

            <input
              type="password"
              className="outline-none p-2 w-[90%]"
              placeholder="password"
              name="password"
              value={userDetails.password}
              onChange={handleOnchange}

            />
          </div>
          <div className="rounded-sm mt-10 w-full flex gap-5">
           
            <label htmlFor="profilePic" className='bg-blue-100 p-3 rounded-full'>
            <MdAddAPhoto size={27}/>
            </label>
            <p className='my-auto'>choose a profile picture for you</p>
            <input
              type="file"
              className="outline-none p-2 w-[90%] hidden"
              name="profilePic"
              id='profilePic'
              onChange={(e)=>handleFileChange(e.target.files[0])}
            
            />
          </div>

          <button onClick={handleSignup} className="p-1 my-8 rounded-md bg-purple-400 font-bold w-full text-white hover:bg-purple-600 shadow ">
            Sign up
          </button>
          <a href="/login" className="mt-5 text-purple-500">already registered ? login here</a>
     
        </div>
      </div>

      <Loader loading={loading}/>

    </div>
  )
}
