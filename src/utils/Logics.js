import axios from 'axios';


export const isSavedPost = (postId, user) => {

        const match = user?.SavedPosts?.filter((ele)=>ele==postId);
        return match?.length===0?false:true;

}

export const FollowStatus = (user, person) => {

    var status = "Follow";

    if (user?.friends && person?.Requests) {

        user?.friends?.forEach(friendId => {

            if (friendId === person._id) {

                status = 'Friends'

            }
        });

        person.Requests.forEach(personId => {

            if (personId === user?._id) {
                status = "requested"

            }
        });
    }

    return status;

}

export const handleFollowClick = async (follow_state ,setfollow_state ,user ,person) => {

    try {

        if (follow_state === "requested") {

            setfollow_state("Follow");
            const { data } = await axios.post('/api/request/cancel', {
                user_id: user._id, person_id: person._id
            })
        }
        else {

            setfollow_state("requested");
            const { data } = await axios.post('/api/request/make', {
                user_id: user._id, person_id: person._id
            })
        }
    } catch (error) {
        console.log(error.message);
    }
}

export const isLiked = (likes, userId)=>{

    if(likes.length===0) return false;

    for(var i=0;i<likes.length;i++){
        if(likes[i]===userId) return true;
    }
    return false;
    
}

export const getFollowStatus = (user, person) => {

    var status = "Follow";

    if( user?.friends && person?.Requests) {

        user?.friends.forEach(element => {
            
            if (element === person._id) {
                status = 'Friends'

            }
        });

        person?.Requests.forEach(element => {
            
            if (element === user._id) {
                status =  "requested"

            }
        });
    }
    return status;

}

