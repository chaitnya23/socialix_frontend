export const addLikeToPostsCache = (queryClient, _id, userId) => {
    queryClient.setQueryData(["posts"], (prevData) => {
        return prevData?.map((ele, i) => {
            if (ele._id === _id) {
                return { ...ele, Likes: [...ele?.Likes, userId] };
            }
            return ele;
        })
    })

    queryClient.setQueryData(["get-post",_id], (prevData) => {
        
            return { ...prevData, Likes: [...prevData?.Likes, userId] };
        
    })
}

export const addSaveToPostsCache = (queryClient, postId, setuser) => {
    setuser((prevData) => {
        console.log({ ...prevData, SavedPosts: [...prevData?.SavedPosts, postId] });
        return { ...prevData, SavedPosts: [...prevData?.SavedPosts, postId] };
    })
}

export const removeLikeFromPostsCache = (queryClient, _id, userId) => {
    queryClient.setQueryData(["posts"], (prevData) => {

        return prevData?.map((ele, i) => {
            if (ele._id === _id) {
                const updatedLikes = ele?.Likes?.filter((user_id) => {
                    return user_id !== userId;
                })

                return { ...ele, Likes: updatedLikes }
            }
            return ele;
        })
    })

    queryClient.setQueryData(["get-post",_id], (prevData) => {
        
        return { ...prevData, Likes: prevData?.Likes?.filter((id)=>id!==userId) };
    
})
}

export const removeSaveFromPostsCache = (queryClient, post_id,setuser) => {
    setuser((prevData) => {
        return {
            ...prevData, SavedPosts: prevData?.SavedPosts?.filter((postId) => {
                return post_id != postId;
            })
        }
    })
}

export const isFollowing = (friends, person_id) => {

    if (friends?.length === 0 || friends === null) return false;

    for (var i = 0; i < friends.length; i++) {
        if (friends[i]?._id == person_id) return true;
    }
    return false;
}