import React, { useContext } from "react";
import { COLORS, MdClose, MdOutlineDone } from "../../utils";
import { useAcceptRequest, useDenyRequest, useGetRequests } from "../../apis";
import { UserContext } from "../../context/Context";

export default function RequestsContainer() {
  const { user } = useContext(UserContext);
  const { data: requestsData } = useGetRequests(user?._id);
  
  const { mutate: handleAcceptRequest } = useAcceptRequest();
  const { mutate: handleDenyRequest } = useDenyRequest();

  return (
    <div>
      <div
        className="friend-requests-box p-4 mx-6 rounded-xl"
        style={{ backgroundColor: COLORS.dark }}
      >
        <p className="font-semibold text-xl text-white mb-5">Friend Requests</p>

        <div className="max-h-[25rem] min-h-fit md:grid grid-cols-2 gap-7 overflow-scroll no-scrollBar">
          {requestsData &&
            requestsData.map((person) => {
              return (
                <RequestCard
                  {...person}
                  handleDenyRequest={() =>
                    handleDenyRequest({
                      user_id: user._id,
                      person_id: person._id,
                    })
                  }
                  handleAcceptRequest={() =>
                    handleAcceptRequest({
                      user_id: user._id,
                      person_id: person._id,
                    })
                  }
                />
              );
            })}

           

        </div>
        
      </div>
    </div>
  );
}

const RequestCard = ({
  _id,
  name,
  userName,
  profilePic,
  handleAcceptRequest,
  handleDenyRequest,
}) => {
  return (
    <div className="mt-8">
      <div className="user-info flex gap-3 ">
        <div className="user-dp w-12 h-12 mx-auto">
          <img
            className="w-full h-full rounded-full object-cover"
            src={profilePic}
            alt=""
          />
        </div>
        <div className="user-deatils my-auto">
          <p className="font-semibold text-md text-white">{userName}</p>
          <p
            className={`font-semibold text-sm `}
            style={{ color: COLORS.gray }}
          >
            {name}
          </p>
        </div>
      </div>

      <div className="flex mt-5 gap-12 justify-between">
        <div
          className="flex p-1 rounded-xl w-1/2 cursor-pointer"
          onClick={handleAcceptRequest}
          style={{ backgroundColor: COLORS.lightblue }}
        >
          <MdOutlineDone size={25} color="white" className="m-auto" />
        </div>
        <div
          className="flex p-1 rounded-xl w-1/2 cursor-pointer"
          onClick={handleDenyRequest}
          style={{ backgroundColor: COLORS.red }}
        >
          <MdClose size={25} color="white" className="m-auto" />
        </div>
      </div>
    </div>
  );
};
