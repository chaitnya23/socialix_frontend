import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FollowStatus, handleFollowClick, isExistsIn } from '../utils/Logics';
import axios from 'axios';



export default function PersonProfileBox({ person, user }) {


    const [follow_state, setfollow_state] = useState("");

    useEffect(() => {

        setfollow_state(FollowStatus(user, person));


        // if (isExistsIn(user.friends, person)) {

        //     setisFollowing(true);
        //     setfollow_state("Following");

        // } else if (isExistsIn(person.Requests, user)) {

        //     setisFollowing(false);
        //     setfollow_state("requested");

        // }

    }, [user])

    
    // const handleFollowClick = async () => {

    //     try {

    //         if (follow_state === "requested") {

    //             setfollow_state("Follow");
    //             const { data } = await axios.post('/api/request/cancel', {
    //                 user_id: user._id, person_id: person._id
    //             })
    //         }
    //         else {

    //             setfollow_state("requested");
    //             const { data } = await axios.post('/api/request/make', {
    //                 user_id: user._id, person_id: person._id
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // }

    

    return (
        <>
            <div className="flex rounded-lg p-1 my-3 justify-center items-center ml-3 ">
                <img src={person.profilePic !== "" ? person.profilePic : "/userNoImg.jfif"} alt="" className="rounded-full  w-10 h-10 object-contain" />
                <div className="ml-2 my-auto p-1 w-[40%]">
                    <Link to={`/profile/${person && person._id}`}>
                        <p className="font-bold cursor-pointer text-sm " >{person && person.userName}</p>
                    </Link>
                    <p className="font-thin text-base">{person && person.name}</p>
                </div>
                <div>
                    <button disabled={follow_state === "Friends"} onClick={()=>handleFollowClick(follow_state ,setfollow_state ,user ,person)} className={` rounded-md ml-2 w-24  ${follow_state === "Friends" ? "text-black" : "border-2 border-blue-300 text-blue-300 hover:bg-blue-400 hover:text-white"}  hover:text-black  font-semibold `}>{follow_state}</button>
                </div>
            </div>
            <hr />
        </>
    )
}