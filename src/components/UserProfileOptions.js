import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import {UserContext} from '../context/Context';
import {FollowStatus ,handleFollowClick} from '../utils/Logics';
import { toast } from 'react-toastify';

export default function UserProfileOptions({setdisplayStatus ,person}) {

    const {user} = useContext(UserContext);
    const [follow_state, setfollow_state] = useState("");


    useEffect(() => {
      
        setfollow_state(FollowStatus(user ,person));

    }, [])
    

    const handleUnfriend = async()=>{

        try {
            
            const {data} = await axios.post('/api/user/unfriend' ,{
                user_id:user._id,
                friend_id:person._id
            })

            toast.dark(`${person._id} removed from your friend list!!`);
            window.location.reload();
        } catch (error) {
            
            console.log(error.message);
        }
    }
    return (
        <>
            <div className='h-screen  bg-black opacity-60 absolute top-0 w-full left-0 z-50'>
            </div>
            <div className=' absolute md:left-[35%] left-8  z-[60] top-[35%] opacity-100  p-2 md:w-[30%] w-[80%]'>
                <ul className='flex-col bg-white gap-4 border text-center p-1 rounded-xl'>
                    
                    <hr />
                    {
                        follow_state==="Friends"?
                        <li className='my-3 p-1 cursor-pointer text-red-500 font-semibold' onClick={handleUnfriend}>Unfriend</li>:
                        <li className='my-3 p-1 cursor-pointer' onClick={()=>handleFollowClick(follow_state ,setfollow_state ,user ,person)}>{follow_state}</li>
                    }
                    <hr />
                    <li className='my-3 p-1 cursor-pointer text-red-500 font-semibold'>Report</li>
                    <hr />
                    <li className='my-3 p-1 text-red-500 font-semibold cursor-pointer' onClick={()=>setdisplayStatus(false)}>Cancel</li>
                </ul>
            </div>
        </>
    )
}
