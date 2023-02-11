import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/Context';

import { BsPeopleFill } from "react-icons/bs";

import PersonProfileBox from '../components/PersonProfileBox'

export default function People() {

    const [users, setusers] = useState([]);

    //context
    const { user } = useContext(UserContext);
    

    useEffect(() => {

        const getUsers = async () => {

            try {

                const { data } = await axios.get(`/api/user/get/all/${user !== undefined ? user._id : ""}`);
                setusers(data);

            } catch (error) {

                console.log(error.message);
                
            }
        }

        getUsers();

    }, [user])


    return (
        <div className='p-1  h-screen mr-2  col-span-2 bg-white  mt-1 sticky '>
            <div className="flex gap-3 justify-center items-center">
                <p className="p-2 my-1 text-lg text-center font-semibold border-b-2 ">People</p>
                <BsPeopleFill size={25} />
            </div>
            <div className='people-section h-[25rem]'>
            
            {
                users &&
                users.map((person, idx) => {
                    
                    return (
                        <PersonProfileBox person={person} key={idx} user={user} />
                        )
                    })
                }
                </div>
            <button className="bg-gray-300 rounded-md w-full my-10 p-1">See all</button>
        </div>
    )
}


