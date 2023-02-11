import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import PersonProfileBox from '../components/PersonProfileBox';
import { UserContext } from '../context/Context'
import { FollowStatus } from '../utils/Logics';

function Friends({setdisplayFriends ,user}) {
  
//   const {user} = useContext(UserContext);
  const [friends, setfriends] = useState([]);
  

  useEffect(() => {
    setfriends(user.friends);
    console.log(friends);
  }, [])
  
  return (
    
    <div className='h-screen absolute top-0 left-0 backdrop-blur-md w-screen z-50'>

    <div className=" m-auto md:w-1/4 w-[90%] p-2 mt-6 bg-white rounded-md shadow-xl ">
        <div className="flex justify-between">
            <h1 className='text-center my-2 font-semibold '> Friends</h1>
            <button className='px-2 text-white bg-red-500 hover:bg-red-600' onClick={()=>setdisplayFriends(false)}>X</button>
        </div>
        <hr />
        <div>
            {
                friends &&
                friends.map((person, idx) => {

                    return (
                        <div className="flex justify-center">
                            <PersonProfileBox person={person} key={idx} user={user} />
                        </div>

                    )
                })
            }
        </div>
    </div>
    
</div>
    
  )
}

export default Friends