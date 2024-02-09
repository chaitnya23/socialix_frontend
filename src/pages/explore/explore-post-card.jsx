import { Link } from "react-router-dom";
import { FaHeart } from "../../utils"

const ExplorePostCard = ({ user: postOwner, image, Likes }) => {
    return (
        <div className='rounded-xl relative overflow-hidden md:h-[18rem] h-[12rem] cursor-pointer hover:scale-105 duration-500 '>
            <img className='w-full h-full object-cover' src={image} alt="" />

            <div className='absolute bottom-0 right-0 left-0 z-[200]'>
                <Link to={'/profile/'+postOwner._id}>
                    <div className="mb-2 md:flex hidden  justify-between items-center">

                        <div className='flex items-center gap-4 '>
                            <img src={postOwner.profilePic} alt="" className="w-12 h-12 rounded-full object-cover ml-2" />
                            <p className="text-white font-semibold"> {postOwner.userName}</p>
                        </div>

                        <div className='flex items-center mr-6 gap-2'>
                            <FaHeart size={15} color='red' />
                            <p className='font-semibold text-white'>{Likes?.length}</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="absolute md:block hidden  -bottom-1 bg-black opacity-70 shadow-2xl shadow-blue-600 z-[100] right-0 left-0 h-14 blur-sm">gfdsdgv</div>
        </div>
    )
}

export default ExplorePostCard;