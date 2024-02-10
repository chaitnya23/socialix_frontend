import React, { useContext, useState } from 'react'
import { COLORS, FaUserFriends, MdLibraryBooks, MdOutlineBookmark } from '../../utils'
import { useGetUser } from '../../apis'
import { useParams } from 'react-router-dom'
import ProfilePostCard from './profile-posts-card';
import { Loader } from '../../components';
import { UserContext } from '../../context/Context';

export default function ProfileContainer() {

    const { id } = useParams();

    const { user: thisUser } = useContext(UserContext)
    const [postsTab, setPostsTab] = useState(true);
    const { data: user, isLoading } = useGetUser(id);

    return (
        <div className='' >
            <Loader loading={isLoading} />
            <div className='rounded-xl p-2 w-3/4 mb-4 mx-auto' >

                <div className='flex gap-5 p-2 rounded-xl item-center my-3  cursor-pointer'>
                    <div className="profile-pic md:w-1/4 ">
                        <img className=" md:w-32 md:h-32 w-20 h-20 object-cover rounded-full" src={user && user.profilePic} alt="" />
                    </div>

                    <div className="user-info  my-auto">
                        <p className={`font-bold md:text-4xl text-2xl my-2 `} style={{ color: COLORS.gray }}>{user && user.name}</p>
                        <p className="font-semi  text-white">@{user && user.userName}</p>
                        <div className='flex gap-8 items-center mt-12'>

                            <p className='' style={{ color: COLORS.gray }}>{user && user.friends.length} Friends</p>
                            <p className='' style={{ color: COLORS.gray }}>{user && user.Posts.length} Posts</p>
                            {
                                user && thisUser._id === user._id &&
                                <p className='' style={{ color: COLORS.gray }}>{user && user.SavedPosts.length} Saved</p>
                            }


                        </div>
                    </div>
                </div>

                <div className="flex gap-6 mt-12 mb-3">
                    <div className=" rounded p-2 flex gap-1 items-center cursor-pointer" style={{ background: COLORS.dark }} onClick={() => setPostsTab(true)}>
                        <MdLibraryBooks size={23} color={COLORS.lightblue} />
                        <p className=" ml-3 font-semibold text-white">Posts</p>
                    </div>

                    {
                        thisUser && user && thisUser._id === user._id &&

                        <div className=" rounded p-2 flex gap-1 items-center cursor-pointer" style={{ background: COLORS.dark }} onClick={() => setPostsTab(false)}>
                            <MdOutlineBookmark size={23} color={COLORS.lightblue} />
                            <p className=" ml-3 font-semibold text-white">Saved</p>
                        </div>
                    }
                </div>


                {
                    user && thisUser && !postsTab && thisUser._id === user._id ?
                        (<div className="grid md:grid-cols-3 grid-cols-2 gap-6 no-scrollBar md:h-[35rem] h-[25rem]">
                            {
                                user && user.SavedPosts.map((post, i) => {
                                    return <ProfilePostCard {...post} key={i} />
                                })
                            }
                        </div>) : (
                            <div className="grid md:grid-cols-3 grid-cols-2 gap-6 no-scrollBar md:h-[35rem] h-[25rem]">
                                {
                                    user && user.Posts.map((post, i) => {
                                        return <ProfilePostCard {...post} key={i} />
                                    })
                                }

                            </div>
                        )
                }

            </div>
        </div>
    )
}
