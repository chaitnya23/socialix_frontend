import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, useUserLogin } from '../../apis';
import Loader from '../../components/Loader';
import { UserContext } from '../../context/Context';
import { COLORS, routes } from '../../utils';

export default function LoginContainer({ openSignup }) {

    const [logincred, setLogincred] = useState(null);
    const navigate = useNavigate();

    //context
    const { setuser } = useContext(UserContext);

    //query api
    const { data, isLoading, isError, mutate: handleUserLogin } = useUserLogin(setuser, navigate);

    const handleOnChange = (e) => {
        setLogincred({ ...logincred, [e.target.name]: e.target.value });
    }

    return (
        <div className="login-box shadow-blue-400 bg-white shadow-2xl  rounded  md:flex p-2 mx-10 text-white" style={{ background: COLORS.dark }}>
            <Loader loading={isLoading} />

            <div className="inputs ml-4 my-auto p-4">

                <p className="md:text-5xl text-3xl font-bold my-3" style={{ color: COLORS.gray }}>Login <span style={{ color: COLORS.lightblue }}>&</span> Socialize</p>

                <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 ">
                    <label htmlFor="userName" className="ml-2 font-semibold text-gray-500" style={{ color: COLORS.gray }}>USERNAME</label>

                    <input
                        type="text"
                        value={logincred?.userName}
                        name="userName"
                        className="outline-none p-2 w-[90%] font-semibold text-lg block bg-transparent"
                        onChange={handleOnChange}
                    />
                </div>
                <div className="rounded-sm mt-10 w-full border-b-2 border-blue-300 ">
                    <label htmlFor="password" className="ml-2 font-semibold text-gray-500" style={{ color: COLORS.gray }}>PASSWORD</label>
                    <input
                        type="password"
                        name="password"
                        value={logincred?.password}
                        className="outline-none p-2 w-[90%] block bg-transparent"
                        placeholder=""
                        onChange={handleOnChange}
                    />
                </div>

                <button onClick={() => handleUserLogin(logincred)} className=" my-8  bg-blue-400 font-bold md:w-[30%] w-full py-3 rounded-full shadow-lg shadow-blue-500 text-white hover:bg-blue-600  ">
                    Login
                </button>
                <div onClick={openSignup} className='cursor-pointer'>
                    <p className="my-4 p-1 text-blue-600">new here ? sign up now</p>
                </div>
            </div>

        </div>
    )
}
