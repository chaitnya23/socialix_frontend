import React, { useContext, useMemo, useState } from 'react'
import { COLORS, getFollowStatus, isLiked, routes } from '../../utils'
import { FollowBtn } from '../../components/ui/custom-btns'
import { useSendFollowRequest } from '../../apis'
import { UserContext } from '../../context/Context'
import { Link } from 'react-router-dom'

export default function PeopleCard({ Requests, _id, userName, name, profilePic }) {

    const { user } = useContext(UserContext);
    const { mutate: sendRequest } = useSendFollowRequest(user._id);

    const followStatus = getFollowStatus(user, { Requests, _id });


    return (
        <div className=' p-2 rounded-lg h-fit ' style={{ background: COLORS.dark }}>
            <div className=" ">
            <Link to={routes.profile+'/'+_id}>
            <img src={!!profilePic?profilePic:require('../../asset/user-img.png')} className="md:h-20 h-16 md:w-20 w-16 rounded-full mx-auto object-cover" alt="" />
            <p className="text-white font-bold mt-3 text-center text-sm md:text-lg">{name}</p>
            <p className="text-white font-bold  text-center mb-5" style={{ color: COLORS.gray }}>@{userName}</p>
            </Link>

                <div className='flex justify-center mb-2' onClick={() => sendRequest({ person_id: _id, user_id: user?._id })}>
                    {
                        followStatus == "Follow" ?
                            <FollowBtn person_id={_id} />
                            :
                            <p className='font-bold text-center p-1 text-white'>Requested</p>
                    }
                </div>
            </div>
        </div>
    )
}
