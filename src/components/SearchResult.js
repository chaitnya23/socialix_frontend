import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../context/Context';
import PersonProfileBox from './PersonProfileBox';

export default function SearchResult({ search ,setdisplayResult }) {

    const [users, setusers] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {


        const getUsers = async () => {

            try {

                const { data } = await axios.get(`https://socialix-social-media-backend.vercel.app/api/user/search/${search}`);
                setusers(data);

            } catch (error) {

                console.log(error.message);
            }
        }

        getUsers();

    }, [user, search])


    return (
        <div className='h-screen absolute top-13 backdrop-blur-md w-screen z-50'>

            <div className="result-box m-auto w-1/3 p-2 mt-6 bg-white rounded-md ">
                <div className="flex justify-between">
                    <p className='text-center my-2'>Search results</p>
                    <button className='hover:bg-red-500 font-bold hover:text-white p-2 ' onClick={()=>setdisplayResult(false)}>X</button>
                </div>
                <hr />
                <div>
                    { 
                        users &&
                        users.map((person, idx) => {

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



