import { useMutation, useQueryClient } from "react-query"
import { addLikeToPostsCache,addSaveToPostsCache, removeLikeFromPostsCache ,removeSaveFromPostsCache} from "../../components/posts/post-utils";
import { addComment, addDislikeToPost, addLikeToPost, createPost, savePost, unSavePost } from "../post-api-calls";
import { acceptRequest, cancelRequest, denyRequest, sendRequest } from "../user-api-calls";
import { loginUser, signupUser } from "../auth-api-calls";
import { routes } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/Context";
import { toast } from "react-toastify";


export const useUserLogin = (setuser,navigate)=>{
    const queryClient = useQueryClient();

    return useMutation(loginUser,{
        retry:2,
        onSuccess:({user,token})=>{
            
            localStorage.setItem('token',token);
            toast.success(`welcome back  ${user.userName} 🫂`);
            queryClient.invalidateQueries(['user', user._id]);
            // queryClient.invalidateQueries(['verify-user', user._id]);

            navigate(routes.home);
            
        },
        onError:()=>{
            toast.error("oops !! error try again ");
        }
        
    })
}

export const useUserSignup = (setuser,navigate)=>{

    const queryClient = useQueryClient();

    return useMutation(signupUser,{
        retry:1,
        onSuccess:({data:{user,token}})=>{
            
            localStorage.setItem('token',token);
            queryClient.invalidateQueries(['user', user._id]);
            queryClient.invalidateQueries(['verify-user', token]);
            
            toast.success(`welcome to socialix  ${user.userName} 😌`);

            navigate(routes.home);
            
        },
        onError:(e)=>{
            
            toast.error(e.response.data?e.response.data.message:"oops !! error try again ");
        }
        
    })
}

export const useLikeAndDislikePost = (isUserLikedPost, postId, userId) => {

    const queryClient = useQueryClient();
    return useMutation(
        ["like-post"],
        (payload) => {
            if (!isUserLikedPost) return addLikeToPost(payload);
            else return addDislikeToPost(payload);
        },
        {
            onMutate: (variables) => {
                if (!isUserLikedPost) addLikeToPostsCache(queryClient, postId, userId);
                else removeLikeFromPostsCache(queryClient, postId, userId);
            },
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"], { exact: true });
            },
        }
    )
}


export const useSaveAndUnsavePost = (isUserSavedPost, postId,setuser) => {

    const queryClient = useQueryClient();
    return useMutation(
        ["save-unsave-post"],
        (payload) => { 
            if (!isUserSavedPost) return savePost(payload);
            else return unSavePost(payload);
        },
        { 
            onMutate: (variables) => {
                if (!isUserSavedPost) addSaveToPostsCache(queryClient, postId,setuser);
                else removeSaveFromPostsCache(queryClient, postId, setuser);
            }, 
            onSuccess: ({message}) => {
                toast.success(message);
                queryClient.invalidateQueries(["posts"], { exact: true });
                queryClient.invalidateQueries(["verify-user"], { exact: true });

            },
            onError:()=>{
                toast.error("oops !! error try again later ");
            }
        }
    )
}

export const useAddComment = () => {

    const queryClient = useQueryClient();

    return useMutation(["post-comment"], addComment, {
        onSuccess: ({user,comment}, variables) => {
            toast.success(`commented "${comment}" on ${user.userName}'s post`)
            queryClient.invalidateQueries(["comments", variables.post_id]);
        },
        onError:()=>{
            toast.error("oops !! error try again later ");
        }
    })
}

export const useSendFollowRequest = (id) => {
    const queryClient = useQueryClient();
    
    return useMutation(["send-request"], sendRequest,{
        onMutate:(variables)=>{
            console.log("user id 1: ",id);
            queryClient.setQueryData(["get-new-people", id] ,(prevData)=>{
                
                return prevData?.map((ele)=>{
                    if(ele._id==variables.person_id){
                        return {...ele ,Requests:[...ele.Requests, variables.user_id]}
                    }
                    return ele;
                })
            })

            
        },
        onSuccess:(data)=>{
            console.log("user id success : ",id);
            
            queryClient.invalidateQueries(["posts"]);
            queryClient.invalidateQueries(["get-new-people" ,id]);

        }
    })
}


export const useAcceptRequest = ()=>{

    const queryClient = useQueryClient();

    return useMutation(["accept-request"],acceptRequest,{
        onSuccess:()=>{
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["posts"]);

        },
        onError:()=>{
            toast.error("oops !! error try again later ");
        }
    })
}

export const useDenyRequest = ()=>{

    const queryClient = useQueryClient();

    return useMutation(["cancel-request"],denyRequest,{
        onSuccess:()=>{
            queryClient.invalidateQueries(["requests"]);
            queryClient.invalidateQueries(["posts"]);

        },
        onError:()=>{
            toast.error("oops !! error try again later ");
        }
    })
}

export const useCreatePost = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation(['create-post'],createPost ,{
        retry:0,
        onSuccess:()=>{
            queryClient.invalidateQueries(["posts"]);
            toast.success("created the post successfully!!");
            navigate(routes.home);
        }
    })
}