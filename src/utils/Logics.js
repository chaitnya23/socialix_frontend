import axios from 'axios';


export const isSavedPost = (post, user) => {

    try {

        user.SavedPosts.forEach(ele => {

            if (ele._id === post._id) {

                return true;
            }
        });

    } catch (error) {

        return false;
    }

}

export const FollowStatus = (user, person) => {

    var status = "Follow";

    if (user.friends && person.Requests) {

        user.friends.forEach(element => {

            if (element._id === person._id) {

                status = 'Friends'

            }
        });

        person.Requests.forEach(element => {

            if (element._id === user._id) {
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


