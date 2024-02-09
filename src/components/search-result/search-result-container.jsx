import React, { useContext } from "react";
import { COLORS, IoMdAdd, MdClose } from "../../utils";
import { useQuery } from "react-query";
import { searchUser, useSearchUser } from "../../apis";
import { Link } from "react-router-dom";

export default function SearchResultContainer({ searchResults }) {
  // const { data: users, isLoading } = useSearchUser(searchParam);


  return (
    <div className="absolute top-[105%] right-0 left-0 w-full ">

      <div
        className="results-box  p-2 rounded-xl shadow"
        style={{ backgroundColor: COLORS.dark }}
      >
        <div className="no-scrollBar  max-h-[25rem] overflow-scroll">
          {
            searchResults.map((user, i) => {

              return <ResultUserBox {...user} key={i} />
            })
          }


        </div>
      </div>
    </div>
  );
}

const ResultUserBox = ({ _id, userName, name, profilePic, friends }) => {


  return (
    <Link to={'/profile/' + _id}>
      <div className="flex  p-2 rounded-xl item-center my-2  cursor-pointer hover:bg-gray-700">
        <div className="profile-pic w-[20%]">
          <img
            className="w-12 h-12 object-cover rounded-full"
            src={profilePic}
            alt=""
          />
        </div>

        <div className="user-info  my-auto">
          <p className="font-semi  text-white">{userName}</p>
          <p
            className={`font-semibold text-sm mt-2 `}
            style={{ color: COLORS.gray }}
          >
            {name}
          </p>
        </div>

      </div>
    </Link>
  );
};
