import React, { useContext } from 'react'
import { COLORS, FaHeart, FaRegBookmark, FaRegHeart, MdLocationOn, MdOutlineBookmark, isLiked, isSavedPost } from '../../utils'
import { useGetPostDetails, useLikeAndDislikePost, useSaveAndUnsavePost } from '../../apis'
import { Link, useParams } from 'react-router-dom';
import CommentsContainer from '../../components/comment/comments-container';
import { UserContext } from '../../context/Context';

export default function PostViewContainer() {

    const { id } = useParams();
    const { user, setuser } = useContext(UserContext);

    const { data: postData } = useGetPostDetails(id);
    const isUserLikedPost = isLiked(postData?.Likes, user?._id);
    const isPostSaved = isSavedPost(postData?._id, user);

    const { data, mutate: updateLike } = useLikeAndDislikePost(isUserLikedPost, postData ? postData._id : "", user?._id);
    const { mutate: updateSave } = useSaveAndUnsavePost(isPostSaved, postData ? postData._id : "", setuser);

    return (
        <div>
            <div className="main md:w-[90%] min-h-fit max-h-screen p-2 rounded-lg md:flex gap-5 mx-2 md:mx-auto mt-16" style={{ background: COLORS.dark }}>
                <div className="md:w-1/2 max-h-[35rem] min-h-fit rounded">
                    <img src={postData && postData.image} className='w-full h-full object-cover rounded' alt="" />
                </div>

                <div className="details md:w-1/2 md:mt-1 mt-6">
                    <Link to={'/profile/'+postData?.user._id}>
                        <div className="user-info flex gap-3">
                            <div className="user-dp w-12 h-12">
                                <img
                                    className="w-full h-full rounded-full object-cover"
                                    src={postData && !!postData.user.profilePic ? postData.user.profilePic : require('../../asset/user-img.png')}
                                    alt=""
                                />
                            </div>
                            <div className="user-deatils my-auto">
                                <p className="font-semibold text-md text-white">
                                    {postData && postData.user.userName}
                                </p>
                                <div
                                    className={`font-semibold text-sm flex items-center gap-1 mt-1`}
                                    style={{ color: COLORS.gray }}
                                >

                                    <div className="flex items-center gap-1">
                                        <MdLocationOn size={17} />
                                        <p>{postData && postData.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Link>
                    <div className="mt-4">
                        <p className="my-1 text-lg text-white">{postData && postData.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {
                                postData && postData.tags.map((tag, i) => {
                                    return <div key={tag} className='px-1 py-[1px] rounded font-semibold text-sm' style={{ background: COLORS.gray }}>{tag}</div>;
                                })
                            }

                        </div>
                        <div className='w-full flex justify-between gap-12 my-3'>
                            <div className={`rounded-xl cursor-pointer  flex justify-center items-center gap-4 p-3`} onClick={() => updateLike({ user_id: user._id, post_id: postData ? postData._id : "" })} style={{ backgroundColor: COLORS.dark }}>

                                {
                                    isUserLikedPost ? <FaHeart size={25} color='red' /> : <FaRegHeart size={25} color={COLORS.gray} />
                                }

                                <p className='font-semibold text-white'>
                                    {postData && postData.Likes?.length}
                                </p>
                            </div>


                            <div className={`rounded-xl cursor-pointer   flex justify-center items-center gap-4 p-3`} onClick={() => updateSave({ user_id: user._id, post_id: postData ? postData._id : "" })} style={{ backgroundColor: COLORS.dark }}>
                                {
                                    isPostSaved ?
                                        <MdOutlineBookmark size={25} color='orange' />
                                        :
                                        <FaRegBookmark size={25} color={COLORS.gray} />
                                }

                            </div>
                        </div>

                        <div className="">
                            {postData && <CommentsContainer postId={postData._id} commentBoxHeight={18} />}
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}
