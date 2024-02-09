import { IoMdAdd } from "react-icons/io"
import { COLORS, MdOutlineDone } from "../../utils"
import { useContext } from "react"
import { UserContext } from "../../context/Context"
import { useMutation } from "react-query"
import { sendRequest } from "../../apis"

export const FollowBtn = () => {

    return (
        <div className='flex' >
            <div className={`flex gap-3 p-2 items-center cursor-pointer rounded-xl`} style={{ backgroundColor: COLORS.lightblue }}>
                <IoMdAdd size={25} color='white' />
                <p className='text-lg font-semibold text-white '>Follow</p>
            </div>
        </div>
    )
}


export const FollowingBtn = () => {
    return (
        <div className='flex'>
            <div className={`flex gap-3 p-2 items-center cursor-pointer rounded-xl`} >
                
                <p className='text-lg font-semibold text-white '>Following</p>
            </div>
        </div>
    )
}