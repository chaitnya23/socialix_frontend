import React, { useState, useEffect, useContext } from "react";
import { AiFillLike, AiOutlineSend } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";

import { BsFillBookmarkFill, BsThreeDotsVertical } from "react-icons/bs";
import { UserContext } from "../context/Context";
import axios from "axios";

import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import PostOptions from "./PostOptions";
// import socket from "../utils/socket-io";
import FloatingNotification from "./FloatingNotification";


export default function Post({ post }) {


  const { user } = useContext(UserContext);

  // component states
  const [postState, setpostState] = useState({
    likes: 0,
    comments: 0
  })
  const [liked, setliked] = useState(false);
  const [isSaved, setisSaved] = useState(false);
  const [userComment, setuserComment] = useState("");
  const [displayStatus, setdisplayStatus] = useState(false);
  

  useEffect(() => {

    setpostState({ ...postState, likes: post.Likes.length, comments: post.comments.length });

    //make function

    if (post) {

      post.Likes.forEach((element, i) => {

        if (element._id === user._id) {
          setliked(true);
        }
      });
    }

    if (user.SavedPosts) {

      user.SavedPosts.forEach(ele => {


        if (ele._id === post._id) {

          setisSaved(true)
        }
      });
    }
  }, [user])

  // funtion to add like
  const addLike = async () => {

    setliked(true);
    try {

      const { data } = await axios.post('https://socialix-social-media-backend.vercel.app/api/post/add/like', {
        user_id: user._id, post_id: post._id
      });


      setpostState({ ...postState, likes: postState.likes + 1 });

    } catch (error) {

      console.log(error.message);
    }
  }


  // funtion to remove like
  const removeLike = async () => {

    setliked(false);
    try {

      const { data } = await axios.post('https://socialix-social-media-backend.vercel.app/api/post/dislike', {
        user_id: user._id, post_id: post._id
      });

      setpostState({ ...postState, likes: postState.likes - 1 });

    } catch (error) {

      console.log(error.message);
    }
  }

  // post saving feature
  const savePost = async () => {

    try {

      const { data } = await axios.post('https://socialix-social-media-backend.vercel.app/api/post/save', {
        user_id: user._id, post_id: post._id
      })

      setisSaved(true);
      toast.dark("saved");

    } catch (error) {

      console.log(error.message);
    }
  }

  // add comment feature
  const addcomment = async () => {

   
    if(userComment===""){
      toast.error("empty comment !! type something");
      return;
    }
    try {

      const { data } = await axios.post('https://socialix-social-media-backend.vercel.app/api/post/add/comment', {
        user_id: user._id,
        post_id: post._id,
        comment: userComment
      })
     //await axios.post('https://socialix-social-media-backend.vercel.app/api/notification/create' ,{creater:user._id ,receiver:post.user._id ,post:post._id ,content:` commented "${userComment}" on your post`})


      //emmiting notification event
      console.log(user);
      //socket.emit("create-notification" ,{creater:user ,post:post ,content:` commented "${userComment}" on your post` ,receiver:post.user})

      //notify
      toast.dark(`posted comment to \n${post.user.userName}`);

      // update states
      setuserComment("");
      setpostState({ ...postState, comments: postState.comments + 1 });
      console.log(postState);

    } catch (error) {

      console.log(error.message);
      toast.error("something went wrong cheack your internet connection");
    }
  }

  return (
    <div className="my-4 border rounded-md shadow-xl bg-white ">
   

    {displayStatus?<PostOptions isSameUser={user._id===post.user._id} setdisplayStatus={setdisplayStatus} post_id={post._id}/>:""}

      <div className="post-main  p-1">

        <div className="top flex items-center justify-between relative p-1">

          <div className="flex items-center ">
            <img src={post.user.profilePic !== "" ? post.user.profilePic : "/userNoImg.jfif"} alt="" className="rounded-full  w-9 h-9" />

            <div className="post-user ml-3">
              <Link to={`/profile/${post.user._id}`}>
                <p className="font-semibold ">{post && post.user.userName}</p>
              </Link>
            </div>

          </div>

          <BsThreeDotsVertical size={22} className="cursor-pointer" onClick={() => setdisplayStatus((displayStatus) => !displayStatus)} />

          {
            // openPostOptions ?
            // (<div className="post-options absolute border bg-white right-0 top-8 p-2 px-4 text-sm">
            //   <ul >
            //     <Link to={`/post/${post._id}`}>
            //       <li className="p-1  my-2">view post</li>
            //     </Link>
            //     <hr />

            //     <li className="p-1  my-2">{}</li>
            //     <hr />

            //     <Link to={`/profile/${post.user._id}`}>
            //       <li className="p-1  my-2">About this account</li>
            //     </Link>
            //   </ul>
            // </div>)
            // : <div className="hidden"></div>
          }

        </div>

        <Link to={`/post/${post._id}`}>
          <div className="post-image my-4 h-[30rem] max-h-fit">
            <img src={post.image && post.image} className="h-full w-full object-cover" alt="" />
          </div>
        </Link>

        <div className="review flex justify-between my-2 text-sm p-1">

          <div className="flex gap-x-6 items-center">

            <div className="flex cursor-pointer">
              <AiFillLike size={27} style={{ margin: "auto", color: liked ? "blue" : "black" }} onClick={liked ? removeLike : addLike} />
            </div>

            <div className="flex cursor-pointer">
              <Link to={`/post/${post._id}`}>
                <MdModeComment size={27} style={{ margin: "auto" }} />
              </Link>
            </div>

          </div>

          <div className=" cursor-pointer mr-4">
            <BsFillBookmarkFill size={25} onClick={savePost} style={{ margin: "auto", color: isSaved ? "blue" : "black" }} />

          </div>
        </div>

        <p className=" my-auto font-semibold p-1">{postState.likes} Likes</p>

        <p className="font-thin text-sm p-1 ">
          {moment(post.createdAt).format("MMM DD ,YYYY")}
        </p>

        <div className="description my-1 p-1 text-sm">
          <p className=" ">
            <span className="font-semibold mr-2">{post.user.userName}</span>
            {post && post.description}
          </p>
        </div>



        <div className="add-comment flex my-6 align-middle">

          <img src={user.profilePic !== "" ? user.profilePic : "/userNoImg.jfif"} alt="" className="rounded-full  w-10 h-10 my-auto object-contain" />
          <div className="w-[80%] bg-gray-100 ml-3 p-1 rounded-lg">
            <input type="text" value={userComment} className="w-3/4 outline-none  p-1 bg-transparent" placeholder="add a comment" onChange={(e) => {
             
              setuserComment(e.target.value)
            }} />
          </div>
          <AiOutlineSend onClick={addcomment} size={25} style={{ margin: "auto", cursor: "pointer" }} />

        </div>

      </div>

    </div>
  );
}
