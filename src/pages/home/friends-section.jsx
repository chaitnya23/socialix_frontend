import React, { useContext } from 'react'
import { COLORS } from '../../utils'
import { useGetUser } from '../../apis';
import { UserContext } from '../../context/Context';
import FriendDisplayCard from './friend-display-card';

export default function FriendsSection() {

    const { user } = useContext(UserContext);
    const { data: userData } = useGetUser(user?._id);

    return (
        <div className={`mt-6`}>
            <div className={`friends p-2 mx-6 rounded-2xl`} style={{ backgroundColor: COLORS.dark }}>
                <p className="font-semibold text-xl text-white ">Friends</p>
                <div className='min-h-fit max-h-[20rem] overflow-scroll no-scrollBar'>
                    {
                        userData && 
                        userData?.friends?.map((person, i) => {
                            return (
                                <FriendDisplayCard friend={person} key={i} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}


