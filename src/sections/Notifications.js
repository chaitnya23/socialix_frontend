import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import NotificationBox from '../components/Notification-box'
import { UserContext } from '../context/Context';
// import socket from "../utils/socket-io";

export default function Notifications() {

  const [notifications, setnotifications] = useState([]);
  const { user } = useContext(UserContext);



  // useEffect(() => {

  //   const getNotifications = async () => {

  //     try {

  //       const { data } = await axios.get(`https://socialix-social-media-backend.vercel.app/api/notification/get/${user && user._id}`)
  //       setnotifications(data.reverse());

  //     } catch (error) {

  //       console.log(error);
  //     }
  //   }

  //   getNotifications();
  // }, [user])

 

  return (
    <>
      <Navbar />
      <div className='h-fit flex justify-center  backdrop-blur-md w-screen z-50'>
        <div className='shadow-lg md:w-1/2'>

          <p className="text-xl my-3 text-center">Notifications</p>

          {
            notifications &&
            notifications.map((ele, i) => {
              return (
                <NotificationBox content={ele.content} creater={ele.creater} post={ele.post && ele.post} key={i} />
              )
            })
          }


        </div>
      </div>
    </>
  )
}
