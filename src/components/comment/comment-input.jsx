import React, { useContext, useState } from 'react'
import { IoMdSearch, IoMdSend } from 'react-icons/io'
import { COLORS } from '../../utils'
import { UserContext } from '../../context/Context'
import { useMutation } from 'react-query';
import { addComment, useAddComment } from '../../apis';

export default function CommentInputBox({ postId }) {

    const { user } = useContext(UserContext);

    const [comment, setComment] = useState("");
    const { data, isError, isLoading, mutate: postComment } = useAddComment();

    return (
        <div
            className={` p-2 rounded-xl my-3 flex justify-around gap-3 items-center cursor-pointer`}
        >

            <div className="user-dp w-10 h-10">
                <img
                    className="w-full h-full rounded-full object-cover"
                    src={user && user.profilePic}
                    alt=""
                />
            </div>
            <input
                type="text"
                style={{ backgroundColor: COLORS.dark }}
                className="outline-none border-0 w-full bg-transparent text-white p-2 rounded-full "
                placeholder="Add a comment ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <IoMdSend size={25} color={COLORS.gray} onClick={() => {
                postComment({ user_id: user._id, post_id: postId, comment });
                setComment("");
            }} />
        </div>
    )
}
