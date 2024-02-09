import React, { useContext, useState } from "react";
import { COLORS, MdLocationOn, IoMdAdd, getFollowStatus, isLiked, isSavedPost, routes } from "../../utils";
import PostStatsBox from "./post-stats-box";
import { useMutation, useQueryClient } from "react-query";
import {
    addDislikeToPost,
    addLikeToPost,
    sendRequest,
    useLikeAndDislikePost,
    useSaveAndUnsavePost,
    useSendFollowRequest,
} from "../../apis";
import {
    addToPostsCache,
    isFollowing,
    removeFromPostsCache,
} from "./post-utils";
import { FollowBtn, FollowingBtn } from "../ui/custom-btns";
import { UserContext } from "../../context/Context";
import CommentInputBox from "../comment/comment-input";
import { Link } from "react-router-dom";

export default function PostDisplayCard({
    user: postOwner,
    _id,
    image,
    description,
    location,
    tags,
    comments,
    Likes,
}) {


    const { user, setuser } = useContext(UserContext);
    const isUserLikedPost = isLiked(Likes, user?._id);
    const isPostSaved = isSavedPost(_id, user)

    const [followStatus, setfollowStatus] = useState(getFollowStatus(user, postOwner));

    const { data, mutate: updateLike } = useLikeAndDislikePost(isUserLikedPost, _id, user?._id);
    const { mutate: updateSave } = useSaveAndUnsavePost(isPostSaved, _id, setuser);

    const { isError, isLoading, mutate: sendFollowRequest } = useSendFollowRequest();

    const getFollowStatusBtn = () => {

        switch (followStatus) {
            case "Follow":
                return (
                    <div onClick={() => sendFollowRequest({ user_id: user._id, person_id: postOwner._id })}>
                        <FollowBtn person_id={postOwner && postOwner._id} />
                    </div>
                )
                break;
            case "Friends":
                return (
                    <div>
                        <FollowingBtn />
                    </div>
                )

            case "requested":
                return (
                    <p className="text-white font-semibold">Requested</p>
                )
        }
    }
    return (
        <div className="w-full rounded-xl p-2 mb-3" style={{ background: COLORS.dark }}>
            <div className="user-sec flex justify-between p-2 mb-2">
                <Link to={routes.profile + '/' + postOwner._id}>

                    <div className="user-info flex gap-3">
                        <div className="user-dp w-12 h-12">
                            <img
                                className="w-full h-full rounded-full object-cover"
                                src={!!postOwner.profilePic?postOwner.profilePic:require('../../asset/user-img.png')}
                                alt=""
                            />
                        </div>
                        <div className="user-deatils my-auto">
                            <p className="font-semibold text-md text-white">
                                {postOwner.userName}
                            </p>
                            <div
                                className={`font-semibold text-sm flex items-center gap-1 mt-1`}
                                style={{ color: COLORS.gray }}
                            >
                                
                                <div className="flex items-center gap-1">
                                    <MdLocationOn size={17}/>
                                    <p>{location}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                {getFollowStatusBtn()}
            </div>

            <div>
                <p className="font-semibold mt-5 font-lg text-white" >
                    {description}
                </p>

                <div className="flex flex-wrap gap-2 text-sm">
                    {
                        tags?.map((tag, i) => {
                            return <div key={tag} className='px-1 py-[1px] rounded font-semibold text-sm' style={{ background: COLORS.gray }}>{tag}</div>;
                        })
                    }

                </div>
            </div>

            <div className="my-5 mx-3 max-h-[28rem] min-h-fit rounded-xl overflow-hidden">
                <img className="w-full h-full  aspect-square" src={image} alt="" />
            </div>

            {/*post details part*/}
            <PostStatsBox
                likes={Likes}
                isUserLikedPost={isUserLikedPost}
                isPostSaved={isPostSaved}
                updateSave={updateSave}
                _id={_id}
                comments={comments}
                updateLike={updateLike}
            />
        </div>
    );
}
