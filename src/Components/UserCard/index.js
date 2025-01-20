import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaArrowRight } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaTreeCity } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../Redux/UserSlice";

function UserCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const action = UserSlice.actions;

  const { darkTheme } = useSelector((store) => {
    return store.ThemeState;
  });

  const { user } = props;

  const { id, name, email, address } = user;
  const { city } = address;

  const ViewDetails = () => {
    navigate(`user/${id}`);
    dispatch(action.setUserDetailsView(user));
  };

  return (
    <li
      key={id}
      className={`list-none p-4 shadow-md w-full ${
        darkTheme ? "bg-gray-700" : "bg-white"
      } mb-4 rounded-lg flex flex-col sm:flex-row sm:items-left justify-between sm:items-center`}
    >
      <div className="mb-3 sm:m-0">
        <div className="flex items-center text-[1.5rem]">
          <FaUser className={`text-blue-400 mr-1`} />
          <h1>{name}</h1>
        </div>

        <div className="flex items-center sm:ml-1">
          <MdOutlineEmail className={`text-red-500 mr-1`} />
          <p>{email}</p>
        </div>

        <div className="flex items-center sm:ml-1">
          <FaTreeCity className={`text-green-500 mr-1`} />
          <p>{city}</p>
        </div>
      </div>

      <button
        onClick={ViewDetails}
        className="flex items-center text-blue-500 justify-center border-[2px] border-blue-500 hover:bg-blue-500 hover:text-white rounded-lg font-semibold p-2"
      >
        View Details <FaArrowRight className="ml-1" />
      </button>
    </li>
  );
}

export default UserCard;
