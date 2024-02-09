import { FaUserFriends } from "react-icons/fa"
import { MdHomeFilled, MdLibraryBooks, MdOutlineAddPhotoAlternate } from "./icons"

export const apiUrls = {
    // base:"http://localhost:4000",
    base:"https://socialix-social-media-backend.vercel.app",
    login:"/api/auth/login",
    signup:"/api/auth/signup",
    get_user:"/api/user",
    verify:'/api/auth/get',
    get_posts:"/api/post/get",
    like_post:"/api/post/like",
    create_post:"/api/post/create",
    add_comment:"/api/post/add/comment",
    get_comments:"/api/post/get/comments",
    unsave_post:"/api/post/unsave",
    save_post:"/api/post/save",
    dislike_post:"/api/post/dislike",
    send_request:"/api/request/make",
    get_requests:"/api/request/get",
    accept_requests:"/api/request/accept",
    deny_requests:"/api/request/deny",
    get_popular_posts:"/api/post/get/popular",
    search:"/api/user/search",
    get_new_people:"/api/user/get/new/people"
}

export const routes = {
    home:'/',
    auth:'/auth',
    profile:'/profile'
}

export const COLORS = {
    black:"#050406",
    dark:"#1a1b1f",
    lightblue:"#30C9E8",
    gray:"#B2B8C0",
    red:"#ef233c"

}

export const sidebarLinks = [
    {
        route:'/',
        name:"Home",
        icon: <MdHomeFilled className="icon" size={25} color={COLORS.gray} />
    },
    {
        route:'/people',
        name:"People",
        icon: <FaUserFriends className="icon" size={25} color={COLORS.gray} />
    },
    {
        route:'/explore',
        name:"Explore",
        icon: <MdHomeFilled className="icon" size={25} color={COLORS.gray} />
    },
    {
        route:'/create-post',
        name:"Create Post",
        icon: <MdOutlineAddPhotoAlternate className="icon" size={25} color={COLORS.gray} />
    }
    
]