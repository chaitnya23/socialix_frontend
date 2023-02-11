import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

export default function PostOptions({setdisplayStatus ,isSameUser ,post_id}) {

    const deletePost = async()=>{

        try {
            const data = await axios.delete(`/api/post/delete/${post_id}`)
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
    <div className='h-screen  bg-black opacity-60 absolute top-0 w-full left-0 z-50'>
            </div>
            <div className=' absolute left-[35%]  z-[60] top-[30%] opacity-100  p-2 w-[30%]'>
                <ul className='flex-col bg-white gap-4 border text-center p-1 rounded-xl'>
                    
                    <hr />
                    <Link to={`/post/${post_id}`}>
                    <li className='my-3 p-1 cursor-pointer  font-semibold'>View post</li>
                    </Link>
                    <hr />
                    <li className='my-3 p-1 cursor-pointer  font-semibold'>About This account</li>
                    <hr />
                    <li className='my-3 p-1 cursor-pointer text-red-500 font-semibold'>Report</li>
                    <hr />
                    {isSameUser ? (<li className='my-3 p-1 cursor-pointer text-red-500 font-semibold' onClick={deletePost}>Delete</li>):""}
                    <hr />
                    <li className='my-3 p-1 text-red-500 font-semibold cursor-pointer' onClick={()=>setdisplayStatus(false)}>Cancel</li>
                </ul>
            </div>

    </div>
  )
}
