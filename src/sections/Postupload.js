import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { BiImage } from "react-icons/bi";
import { UserContext } from '../context/Context';
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationBox from '../components/Notification-box';

export default function Postupload({ setposts, posts }) {


    const { user } = useContext(UserContext);

    const [postState, setpostState] = useState({ description: "" });
    const [postLoading, setpostLoading] = useState(false); 

    const uploadPost = async () => {

        setpostLoading(true);
        if (!postState.imgUrl) {

            throw Error("please select an image  ");

        }

        try {


            const { data } = await axios.post('https://socialix-social-media-backend.vercel.app/api/post/create', {
                user_id: user._id,
                image: postState.imgUrl,
                description: postState.description
            })

            setposts([data ,...posts]);

            setpostState({});
            setpostLoading(false);
            window.location.reload();
        } catch (error) {

            console.log(error.message);
            setpostLoading(false);

        }
    }


    const handleFileChange = async (file) => {
        if (file === undefined) {
            window.alert("something went wrong!! upload ur profile");
            throw new Error("file not selected!!");
        }
        try {
            const toastId = toast.loading("loading image wait ....");

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
                setpostState({ ...postState, imgUrl: res.data.url });
                console.log(res.data);
                toast.dismiss(toastId);


            }
        } catch (error) {

            console.log(error.message);

            window.alert("something went wrong!!");
        }
    };


    return (
        <div>

            <div className='border p-1 mb-3 bg-white shadow-xl mt-2'>
                <div className="flex gap-2 rounded-md justify-between ">
                    <img src={user.profilePic!==""? user.profilePic : "/userNoImg.jfif"} alt="" className="object-contain h-10 w-10 rounded-full" />

                    <textarea type="text" className=" text-sm outline-none p-2 w-[90%]" placeholder='Whats on your mind?' value={postState.description} onChange={(e) => setpostState({ ...postState, description: e.target.value })} />

                </div>
                <div className='flex p-2 mt-1 justify-between'>


                    <label htmlFor="post" className='p-1 mx-2 flex'>
                        <BiImage size={27} style={{ color: "red" }} />
                        <span className="ml-2 text-semibold">Photo</span>
                    </label>
                    <input type="file" className='hidden' accept="image/" name="post" id="post" onChange={(e) => handleFileChange(e.target.files[0])} />
                    <button disabled={postLoading} className='p-1 rounded-md hover:bg-green-600 bg-green-500 text-white px-4' onClick={uploadPost}>share</button>
                </div>
            </div>
            {postLoading?<PostLoader />:<div></div>}
           
        </div>
    )
}

const PostLoader = () => {

    return (
        <div className='p-1 bg-white shadow-xl rounded-md flex gap-5'>
            <MoonLoader size={25} loading={true} />
            <p>finishing up.......</p>
        </div>
    )
}