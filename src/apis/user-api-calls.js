import axios from "axios"
import { apiUrls } from "../utils"

export const getUser = async(id)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_user+'/'+id);
   
    return data;
}

export const verifyUser = async(token)=>{

    const {data} = await axios.get(apiUrls.base+apiUrls.verify+'/'+token);
    return data;
}

export const searchUser = async(searchParam)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.search+'/'+searchParam);
    return data;
}

export const sendRequest = async(payload)=>{
    // console.log(user_id,person_id);
    const {data} = await axios.post(apiUrls.base+apiUrls.send_request,payload);
    return data;
}

export const getUserRequests = async(id)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_requests+'/'+id);
    return data;
}
export const getUserFriends = async(id)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_friends+'/'+id);
    return data;
}

export const acceptRequest = async(payload)=>{
    const {data} = await axios.post(apiUrls.base+apiUrls.accept_requests,payload);
    return data;
}

export const denyRequest = async(payload)=>{
    const {data} = await axios.post(apiUrls.base+apiUrls.deny_requests,payload);
    return data;
}

export const getPopularPosts = async()=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_popular_posts);
    return data;
}

export const getNewPeople = async(id)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_new_people+'/'+id);
    return data;
}