import { Link } from "react-router-dom";
import { COLORS } from "../../utils";

const FriendDisplayCard = ({ friend }) => {
    return (
        <Link to={'/profile/'+friend._id}>
            <div className='flex gap-5 p-2 rounded-xl item-center my-3  cursor-pointer'>
                <div className="profile-pic w-1/4">
                    <img className="w-12 h-12 object-cover rounded-full" src={friend && friend.profilePic} alt="" />
                </div>

                <div className="user-info  my-auto">
                    <p className="font-semi  text-white">{friend && friend.userName}</p>
                    <p className={`font-semibold text-sm mt-2 `} style={{ color: COLORS.gray }}>{friend?.name}</p>
                </div>
            </div>
        </Link>
    )
}

export default FriendDisplayCard;