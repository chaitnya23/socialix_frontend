import React, { useState } from 'react'
import { COLORS, FaCommentAlt, FaHeart, MdOutlineBookmark, FaRegHeart, isLiked, FaRegBookmark } from '../../utils'
import CommentsContainer from '../comment/comments-container';
import { useContext } from 'react';
import { UserContext } from '../../context/Context';
import { isMobileScreen } from '../../utils/lib/app-utils';

export default function PostStatsBox({ _id, isUserLikedPost, likes, comments, updateLike, updateSave, isPostSaved }) {

    const [displayCommentSection, setDisplayCommentSection] = useState(false);
    const { user } = useContext(UserContext);

    return (
        <div>
            <div className='w-full grid grid-cols-3 gap-12 my-3'>
                <div className={`rounded-xl cursor-pointer  flex justify-center items-center gap-4 p-3`} onClick={() => updateLike({ user_id: user._id, post_id: _id })} style={{ backgroundColor: COLORS.dark }}>

                    {
                        isUserLikedPost ? <FaHeart size={25} color='red' /> : <FaRegHeart size={25} color={COLORS.gray} />
                    }

                    <p className='font-semibold text-white'>
                        {likes && likes.length}
                        {!isMobileScreen() &&
                            <span className={`text-sm ml-1 `} style={{ color: COLORS.gray }}>Like</span>
                        }
                    </p>
                </div>

                <div className={`rounded-xl cursor-pointer   flex justify-center items-center gap-4 p-3`} onClick={() => setDisplayCommentSection(!displayCommentSection)} style={{ backgroundColor: COLORS.dark }}>
                    <FaCommentAlt size={22} color={COLORS.lightblue} />
                    <p className='font-semibold text-white'>
                        {comments && comments.length}
                        {!isMobileScreen() &&
                            <span className={`text-sm ml-1 `} style={{ color: COLORS.gray }}>Comments</span>
                        }
                    </p>
                </div>

                <div className={`rounded-xl cursor-pointer   flex justify-center items-center gap-4 p-3`} onClick={() => updateSave({ user_id: user._id, post_id: _id })} style={{ backgroundColor: COLORS.dark }}>
                    {
                        isPostSaved ?
                            <MdOutlineBookmark size={25} color='orange' />
                            :
                            <FaRegBookmark size={25} color={COLORS.gray} />
                    }
                    {
                        !isMobileScreen() &&
                        <p className='font-semibold text-white' style={{ color: COLORS.gray }}>
                            save
                        </p>
                    }
                </div>
            </div>

            {/*comment section */}
            {
                displayCommentSection ?
                    <CommentsContainer postId={_id} /> : null
            }

        </div>
    )
}
