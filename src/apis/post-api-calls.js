import axios from "axios";
import { apiUrls, isLiked } from "../utils"

export const getPost = async(id)=>{

}

export const getAllPosts = async()=>{

    const {data} = await axios.get(apiUrls.base+apiUrls.get_posts);
    return data;
}

export const addLikeToPost= async(payload)=>{

        const {data} = await axios.post(apiUrls.base+apiUrls.like_post,payload);
        return data;

}

export const addDislikeToPost= async(payload)=>{

    const {data} = await axios.post(apiUrls.base+apiUrls.dislike_post,payload);
    return data;

}


export const addComment = async(payload)=>{
    const {data} = await axios.post(apiUrls.base+apiUrls.add_comment,payload);
    return data;
}

export const getPostComments = async(postId)=>{
    const {data} = await axios.get(apiUrls.base+apiUrls.get_comments+'/'+postId);
    return data;
}
export const savePost = async(payload)=>{
    console.log("test");
    return axios.post(apiUrls.base+apiUrls.save_post,payload);
}

export const unSavePost = async(payload)=>{
    return axios.post(apiUrls.base+apiUrls.unsave_post,payload);
    
}

export const createPost = async(payload)=>{

    var imgUrl = "";
    if (payload.imgData) {

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dkvpwutkh/image/upload",
        payload.imgData
      );
      imgUrl = data.url;
    } 

    const tags = payload.tags.split(',').map((e)=>'#'+e.trim());
    const {res} = await axios.post(apiUrls.base+apiUrls.create_post,{...payload ,image:imgUrl,tags});
    return res;
}