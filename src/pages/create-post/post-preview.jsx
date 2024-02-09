import React, { useContext } from 'react'
import { COLORS } from '../../utils';
import { UserContext } from '../../context/Context';

export default function PostPreview({location,description,tags,tempImgUrl}) {

    const {user} = useContext(UserContext);

    return (
        <div className="w-full rounded-xl p-2 mb-3" style={{ background: COLORS.dark }}>
            <div className="user-sec flex justify-between p-2 mb-2">

                <div className="user-info flex gap-3">
                    <div className="user-dp w-12 h-12">
                        <img
                            className="w-full h-full rounded-full object-cover"
                            src={user && user.profilePic}
                            alt=""
                        />
                    </div>
                    <div className="user-deatils my-auto">
                        <p className="font-semibold text-md text-white">
                            {user && user.userName}
                        </p>
                        <p
                            className={`font-semibold text-sm `}
                            style={{ color: COLORS.gray }}
                        >
                        {location}
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <p className="font-semibold mt-5 font-lg text-white" >
                    {description}
                </p>

                <div className="flex gap-2">
                    {
                        tags?.length>0&&
                        tags?.split(',').map((tag, i) => {
                            return <div key={tag} className='px-1 py-[2px] rounded font-semibold my-3' style={{ background:COLORS.gray }}>#{tag}</div>;
                        })
                    }

                </div>
            </div>

            <div className="my-5 mx-3 min-h-fit rounded-xl overflow-hidden">
                <img className="w-full h-full  aspect-square" src={tempImgUrl} alt="" />
            </div>

        </div>
    )
}
