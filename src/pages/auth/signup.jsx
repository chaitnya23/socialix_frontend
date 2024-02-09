import React, { useContext, useState } from "react";
import { MdAddAPhoto } from "react-icons/md";
import { COLORS } from "../../utils";
import { signupUser, useUserSignup } from "../../apis";
import { UserContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components";
import { toast } from "react-toastify";

export default function SignupContainer({ openLogin }) {
  const [signupDetails, setSignUpDetails] = useState({
    email: "",
    name: "",
    userName: "",
    password: "",
    imgData: null,
  });

  const navigate = useNavigate();
  //context
  const { setuser } = useContext(UserContext);

  //signup api call query
  const { mutate: handleUserSignup, isLoading } = useUserSignup(setuser,navigate);

  const handleOnchange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setSignUpDetails({ ...signupDetails, [name]: value });
  };
  const handleFileChange = async (file) => {
    if (file === undefined) {
      toast.error("file not selected!!");
    }

    if (
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "socialix");
      data.append("cloud_name", "dkvpwutkh");

      setSignUpDetails({ ...signupDetails, imgData: data });
    } else {
      toast.error("Please choose a image file only");
    }
  };

  
  return (
    <>
      <Loader loading={isLoading} />
      <div
        className="signup-box bg-white shadow-blue-400 shadow-2xl rounded text-white  my-auto md:flex  gap-12 w-[35rem] p-4 mx-6 h-fit"
        style={{ background: COLORS.dark }}
      >
        <div className="inputs  mr-4 my-auto w-full">
          <p
            className="md:text-4xl text-3xl font-bold my-3 text-center"
            style={{ color: COLORS.gray }}
          >
            Signup <span style={{ color: COLORS.lightblue }}>&</span> Socialize
          </p>

          <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 ">
            <label
              htmlFor="name"
              className="ml-2 font-semibold text block"
              style={{ color: COLORS.gray }}
            >
              NAME
            </label>
            <input
              type="text"
              className="outline-none p-2 w-full  bg-transparent"
              required
              name="name"
              value={signupDetails.name}
              onChange={handleOnchange}
            />
          </div>
          <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 ">
            <label
              htmlFor="userName"
              className="ml-2 font-semibold block"
              style={{ color: COLORS.gray }}
            >
              USERNAME
            </label>

            <input
              type="text"
              name="userName"
              className="outline-none p-2  bg-transparent w-full"
              value={signupDetails.userName}
              onChange={handleOnchange}
            />
          </div>
          <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 ">
            <label
              htmlFor="password"
              className="ml-2 font-semibold text-gray-500 block"
              style={{ color: COLORS.gray }}
            >
              PASSWORD
            </label>
            <input
              type="password"
              className="outline-none p-2  bg-transparent w-full"
              name="password"
              value={signupDetails.password}
              onChange={handleOnchange}
            />
          </div>
          <div className="rounded-sm mt-10 w-full flex gap-5 cursor-pointer">
            <label
              htmlFor="profilePic"
              className="bg-blue-100 p-3 rounded-full block"
            >
              <MdAddAPhoto size={27} color="black" />
            </label>
            {!!signupDetails.imgData ? (
              <p className="my-auto">change profile picture</p>
            ) : (
              <p className="my-auto">choose a profile picture for you</p>
            )}
            <input
              type="file"
              className="outline-none p-2  hidden"
              name="profilePic"
              id="profilePic"
              onChange={(e) => handleFileChange(e.target.files[0])}
            />
          </div>

          <button
            disabled={isLoading}
            onClick={() => handleUserSignup(signupDetails)}
            className=" my-8 block bg-blue-400 font-bold md:w-[30%] w-full py-3 rounded-full shadow-lg shadow-blue-500 text-white hover:bg-blue-600  "
          >
            Sign up
          </button>
          <p onClick={openLogin} className="mt-5 text-blue-500 cursor-pointer">
            already registered ? login here
          </p>
        </div>
      </div>
    </>
  );
}
