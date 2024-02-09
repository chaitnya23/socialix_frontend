import { useContext } from "react";
import CommentInputBox from "./comment-input";
import { UserContext } from "../../context/Context";
import { COLORS } from "../../utils";
import { useMutation, useQuery } from "react-query";
import { addComment, getPostComments } from "../../apis";

export default function CommentsContainer({postId}) {

    const {data:commentsData,isLoading,isError} = useQuery(["comments",postId],()=>{
        return getPostComments(postId);
    },{
        staleTime:1000*4*5
    })

    return (
        <div className="px-3 mt-3">
            <CommentInputBox postId={postId}/>
            <div className="max-h-[30rem] min-h-fit no-scrollBar">
            {
                commentsData && commentsData.map((ele,i)=>{

                    return <CommentMsgCard {...ele} key={i}/>
                })
            }
            </div>
        </div>
    )
}

const CommentMsgCard = ({user, comment}) => {


    return (
        <div className="my-4">
            <div className="flex gap-3 p-1">

                <div className="w-[8%]">
                    <div className="user-dp w-12 h-12">
                        <img
                            className="w-full h-full rounded-full object-cover"
                            src={user&&user.profilePic}
                            alt=""
                        />
                    </div>

                </div>

                <div className="text-white p-2 w-[80%] rounded-md" style={{ backgroundColor: '#2b2d42'}}>
                    <p className="font-semibold text-lg text-white ">{user&&user.userName} </p>
                    <p className="font-semibold mb-6 text-sm" style={{color:COLORS.gray}}>{user&&user.name}</p>

                    <p>{user&&comment}</p>
                </div>

            </div>
        </div>
    )
}