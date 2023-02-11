import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../context/Context';
import { AiFillLike, AiOutlineSend } from "react-icons/ai";
import { toast } from 'react-toastify';


export default function PostPreview() {

    const { id } = useParams();

    const [postDetail, setpostDetail] = useState({});
    const [userComment, setuserComment] = useState("");
    const [postComments, setpostComments] = useState([]);

    const { user } = useContext(UserContext);
  

    useEffect(() => {

        const getPost = async () => {

            try {

                const { data } = await axios.get(`/api/post/${id}`);
                setpostDetail(data);
                setpostComments(data.comments.reverse());

            } catch (error) {

                console.log(error.message);
            }
        }

        getPost();
    }, []);

    const addcomment = async () => {


        try {
            if (userComment === "") {

                toast.error("write something in comment!!");
                throw new Error("comment is empty");
            }

            const { data } = await axios.post('/api/post/add/comment', {
                user_id: user._id,
                post_id: id,
                comment: userComment
            })

            toast.dark(`posted comment "${userComment}" to \n${postDetail.user.userName}`);

            setpostComments([data, ...postComments]);
            setuserComment("");

        } catch (error) {

            console.log(error.message);
        }
    }

    return (

        <div className="h-screen  backdrop-blur-xl flex justify-center  items-center bg-opacity-70">

            <div className="main post-screen md:flex md:h-[30rem] m-auto bg-white md:w-[70%] w-[95%] shadow-2xl border-1">

                <div className="img-box md:w-[65%]  p-1">

                    <img src={postDetail.image && postDetail.image} alt="" className='object-cover max-h-full' />

                </div> 

                <div className=" md:p-3  text-sm">
                    <div className="post-profile-box flex  p-1 my-1">
                        <img src={postDetail.user && postDetail.user.profilePic} alt="" className='object-contain rounded-full w-10 h-10' />
                        <p className="ml-3 my-auto font-semibold">{postDetail.user && postDetail.user.userName}</p>
                    </div>

                    <hr />
                    <div className="flex p-1 my-5  h-[3rem]">
                        <img src={postDetail.user && postDetail.user.profilePic} alt="" className='object-contain w-9 h-9 rounded-full my' />
                        <p className="p-1 m-1 text-sm w-[70%]">
                            <Link to={`/profile/${postDetail.user&&postDetail.user._id}`}>
                                <span className='font-bold mr-2 text-md'>{postDetail && postDetail.userName}</span>
                            </Link>
                            {postDetail && postDetail.description}
                        </p>

                    </div>

                    <p className="my-2 ml-8">{postComments && postComments.length} comments</p>
                    <div className='my-1 p-1 comment-section md:h-[40%] h-32 overflow-scroll overflow-x-hidden'>
                        {
                            postComments &&
                            postComments.map((ele, idx) => {
                                return (
                                    <CommentBox comment={ele.comment} user={ele.user} />
                                )
                            })
                        }


                    </div>
                    <hr />



                    <p className='text-sm p-1 font-semibold'>{postDetail.Likes && postDetail.Likes.length} Likes</p>

                    <div className="add-comment flex my-3  gap-3 ">

                        <img src={user && user.profilePic} alt="" className="rounded-full object-contain w-10 h-10 my-auto" />
                        <div className="w-full bg-gray-100  md:ml-3 m-auto md:px-2 rounded-lg flex">
                            <input type="text" onChange={(e) => setuserComment(e.target.value)} value={userComment} className=" outline-none   p-1 bg-transparent" placeholder="add a comment" />

                        </div>
                        <AiOutlineSend onClick={addcomment} size={32} style={{ margin: "auto", cursor: "pointer" }} />

                    </div>

                </div>

            </div>
        </div>
    )
}

const CommentBox = ({ comment, user }) => {

    return (
        <div className="flex p-1 my-5  h-fit">
            <img src={user === null || user===undefined ? "/userNoImg.jfif" : user.profilePic} alt="" className='object-contain w-9 h-9 rounded-full my' />
            <p className="p-1 m-1 text-sm w-[70%]">
                <Link to={`/profile/${user&&user._id}`}>
                    <span className='font-bold mr-2 text-md'>{user && user.userName}</span>
                </Link>
                {comment && comment}
            </p>

        </div>
    )
}