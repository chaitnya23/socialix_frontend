import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'


import { BsFillGrid3X3GapFill, BsThreeDotsVertical } from "react-icons/bs";

import { MdSaveAlt } from "react-icons/md";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import { AiFillLike } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";

import { MdModeComment } from "react-icons/md";

import { UserContext } from '../context/Context';
import UserProfileOptions from '../components/UserProfileOptions';
import Friends from './Friends';


export default function Profile() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [thisUser, setthisUser] = useState({});
  const [posts, setposts] = useState([]);
  const [isPostsSelected, setisPostsSelected] = useState(true);
  const [loading, setloading] = useState(false);
  const [displayFriends, setdisplayFriends] = useState(false);


  const [displayStatus, setdisplayStatus] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {

    const getUser = async () => {

      setloading(true);

      try {

        const { data } = await axios.get(`/api/user/${id}`);
        setthisUser(data);
        setposts(data.Posts);
        setloading(false);

      } catch (error) {

        setloading(false);
        console.log(error.message);
        // navigate('/')
      }
    }
    getUser();

  }, [])




  return (

    <div className='h-screen  flex-col align-middle justify-center bg-white'>


      <div className="profile-box m-auto  md:w-2/3">

        <div className=" user-box   p-2 flex mt-10 h-fit md:gap-20 gap-8">
          <img src={thisUser.profilePic !== "" ? thisUser.profilePic : "/userNoImg.jfif"} alt="" className="rounded-full p-1 h-36 w-36 border-2  object-contain" />

          <div className="user-info md:p-3 p-1 ml-6">

            <div className='flex justify-between items-center'>
              <p className="text-3xl font-thin my-4">{thisUser && thisUser.userName}</p>
              <BsThreeDotsVertical size={22} className="cursor-pointer" onClick={()=>setdisplayStatus(true)} />

            </div>

            <div className='flex my-5 gap-5'>

              <p className="cursor-pointer" onClick={()=>setdisplayFriends(true)}>{thisUser.friends && thisUser.friends.length} Friends </p>
              <p className=" ">{thisUser.Posts && thisUser.Posts.length} Posts </p>
              <p className=" "> {user._id===thisUser._id? `${thisUser.Requests && thisUser.Requests.length} Requests`:""} </p>
            </div>
            <p className="  text-lg font-semibold my-4">{thisUser && thisUser.name}</p>
          </div>

        </div>
        <hr />

          {
            displayStatus?
            <UserProfileOptions setdisplayStatus={setdisplayStatus} person={thisUser}/>:<br/>
          }

        <div >
          <div className="flex justify-around my-6">
            <div className={`flex cursor-pointer p-1 ${isPostsSelected ? 'border-b-2 border-blue-400' : ""}`} onClick={() => {
              setposts(thisUser.Posts);
              setisPostsSelected(true);
            }}>
              <BsFillGrid3X3GapFill size={25} style={{ cursor: "pointer" }} />
              <span className='ml-2 font-semibold '>Posts</span>
            </div>

            <div className={`flex cursor-pointer p-1 ${!isPostsSelected ? 'border-b-2 border-blue-400' : ""}`} onClick={() => {
              setposts(thisUser.SavedPosts);
              setisPostsSelected(false);
            }}>
              <MdSaveAlt size={25} />
              <span className='ml-2 font-semibold '>Saved</span>
            </div>

          </div>
        </div>

        <div className="posts-box grid grid-cols-3 ">

          {
            posts &&
            posts.map((post, idx) => {
              return (
                <PostCard post={post} key={idx} />
              )
            })
          }

        </div>

        
        </div>
        {
          displayFriends?<Friends user={thisUser} setdisplayFriends={setdisplayFriends}/>:<div></div>
        }

      <Loader loading={loading} />

    </div>
  )
}

const PostCard = ({ post }) => {

  return (
    <Link to={`/post/${post && post._id}`}>
      <div className='md:h-72 h-[9rem] md:w-72 w-[8.5rem] p-1 shadow-xl relative post-card'>

        <div className='absolute post-card-info text-smp  font-semibold gap-5 top-0 h-full w-full text-white bg-black opacity-40 justify-center items-center'>
          <div className=' flex items-center gap-2 z-50'>
            <AiFillLike size={21} />
            <p>
              {post && post.Likes.length}
            </p>
          </div>

          <div className=' flex items-center gap-2 z-50'>
            <MdModeComment size={21} />
            <p>
              {post && post.comments.length}
            </p>
          </div>

        </div>
        <img src={post.image && post.image} className=' post-img  object-cover my-1 h-full' alt="" />
      </div>
    </Link>
  )
}