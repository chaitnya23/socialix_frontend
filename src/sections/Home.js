import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { UserContext } from '../context/Context'
import Menu from './Menu'
import People from './People'
import PostsSection from './PostsSection'

import { useNavigate } from 'react-router-dom'

export default function Home() {
    
    const {user } = useContext(UserContext)
    const navigate = useNavigate();
    
    useEffect(() => {
      if(!user.userName){
        navigate('/login');
      }
    }, [])
    
    
    
  return (
    <div>
            <Navbar />
            <div className="main-container md:grid grid-cols-6 gap-2">
              <Menu />

              <div className="col-span-3 ">

                <PostsSection/>
              </div>

              <People />
            </div>
          </div>
  )
}
