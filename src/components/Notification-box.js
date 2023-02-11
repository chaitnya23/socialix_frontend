import React from 'react'
import { Link } from 'react-router-dom'

export default function NotificationBox({creater ,post ,content}) {

    return (
        <div className='p-1 shadow-sm my-7 flex  justify-between w-full'>
            <div className='flex justify-between w-[90%]'>
                <Link to={`/profile/${creater&&creater._id}`}>
                    <img src={creater?creater.profilePic:"./userNoImg.jfif"} alt="" className='rounded-full w-9 h-9 object-cover mx-2' />
                </Link>
                <div className="content text-sm w-[80%]">
                    <span className='font-bold mr-3'>{creater&& creater.userName}</span>
                    {content&&content}
                </div>
            </div>
            <Link to={`/post/${post._id}`}>
                <img src={post?post.image:"./userNoImg.jfif"} alt="" className=' w-10 h-10 object-cover mx-2' />
            </Link>

        </div>
    )
}
