import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function FloatingNotification({Toast ,setToast ,position}) {

    console.log("toast" ,position);
    
      
        const timeout = setTimeout(()=>{
           setToast({display:false,payload:{}});
        } ,5000)

    

  return (
    <div className={`p-1  floating-notification-box flex z-40 bg-white  fixed justify-between md:left-[35%]  md:w-fit w-full shadow  top-[${position+10}px]` } data-position={position}>
            <div className='flex justify-between w-[90%]'>
                <Link to={'/'}>
                    <img src={Toast.payload.creater?Toast.payload.creater.profilePic:"./userNoImg.jfif"} alt="" className='rounded-full w-9 h-9 object-cover mx-2' />
                </Link>
                <div className="content text-sm w-[80%]">
                    <span className='font-bold mr-3'>{Toast.payload.creater&& Toast.payload.creater.userName}</span>
                    {Toast.payload.content&&Toast.payload.content}
                </div>
            </div>
            <Link to={'/'}>
                <img src={Toast.payload.post?Toast.payload.post.image:"./userNoImg.jfif"} alt="" className=' w-10 h-10 object-cover mx-2' />
            </Link>

        </div>
  )
}
