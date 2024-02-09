import { COLORS } from '../../utils'
import React, { useContext } from 'react'
import FriendsSection from './friends-section'
import { PostDisplayCard, Navbar, SearchResultContainer, UploadPostContainer } from '../../components'
import PostsContainer from './posts-container'
import RequestsContainer from './requests-container'
import { useQuery } from 'react-query';
import { getUser } from '../../apis'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/Context'
import ProfileContainer from '../profile/profile-container'
import Card from './card'

export default function HomeContainer() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);


    return (
        <div className={` `} style={{ backgroundColor: COLORS.black }}>

            <div className={`md:flex gap-5 mt-5 `}>

                <div className="md:w-[55%]">
                    <PostsContainer />
                </div>


                <div className='w-[35%] md:block none md:-16 mx-6'>
                    <RequestsContainer requests={user && user.Requests} />
                    <FriendsSection friends={user && user.friends} />
                    
                </div>
            </div>
        </div>
    )
}
