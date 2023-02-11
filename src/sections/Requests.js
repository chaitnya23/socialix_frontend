import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/Context'
import { toast } from 'react-toastify';


export default function Requests({ displayRequests }) {

    const { user } = useContext(UserContext);
    const [followRequests, setfollowRequests] = useState([]);

    useEffect(() => {
        setfollowRequests(user.Requests);

    }, [user])

    //deny accept request logic

    const confirmRequest = async (id, name) => {

        try {
            setfollowRequests(

                followRequests.filter((ele, idx) => {
                    return ele._id !== id;
                })
            )

            const { data } = await axios.post('/api/request/accept', {
                user_id: user._id, person_id: id
            })


            toast.dark(`confirmed request from ${name}`)


        } catch (error) {
            console.log(error.message);
        }
    }

    const denyRequest = async (id, name) => {

        try {
            setfollowRequests(

                followRequests.filter((ele, idx) => {
                    return ele._id !== id;
                })
            )

            const { data } = await axios.post('/api/request/deny', {
                user_id: user._id, person_id: id
            })

            toast.dark(` request denyed from ${name}`)

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='h-screen absolute top-10 backdrop-blur-md w-screen  align-middle'>

            <div className="m-auto md:w-1/3 w-full bg-white my-4 shadow-2xl">
                <p className="text-xl font-semibold mt-3 p-2">requests</p>
                <hr />
                <div className="my-2 p-2">
                    {
                        followRequests &&
                        followRequests.map((person, idx) => {

                            return (
                                <ProfileBox person={person} key={idx} confirmRequest={confirmRequest} denyRequest={denyRequest} />
                            )
                        })
                    }
                </div>
            </div>


        </div>
    )
}

const ProfileBox = ({ person, confirmRequest, denyRequest }) => {

    return (
        <div className="flex  p-1  justify-center items-center m-auto gap-4 my-4 w-fit shadow-lg">

            <img src={person && person.profilePic} alt="" className="rounded-full  w-12 h-12 object-cover" />
            <div className="ml-2 my-auto p-1 w-[40%]">
                <Link to={`/profile/${person && person._id}`}>
                    <p className="font-bold cursor-pointer text-sm " >{person && person.userName}</p>
                </Link>
                <p className="font-thin text-base">{person && person.name}</p>
            </div>
            <div className='flex gap-4'>
                <button className="px-2 p-1 m-auto bg-blue-500 hover:bg-blue-600 rounded text-white" onClick={() => confirmRequest(person._id, person.userName)}>Confirm</button>
                <button className="px-2 p-1 m-auto outline rounded hover:bg-red-400 hover:text-white outline-red-500 text-red-500" onClick={() => denyRequest(person._id, person.userName)}>deny</button>

            </div>
        </div>
    )
}