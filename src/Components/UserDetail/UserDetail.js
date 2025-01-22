import React, { useEffect } from "react";
import Header from "../Header";
import { useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaUser, FaArrowLeft, FaBuilding } from "react-icons/fa";
import { BounceLoading } from "respinner";
import {
  MdOutlineEmail,
  MdWeb,
  MdOutlinePhoneInTalk,
  MdContacts,
} from "react-icons/md";
import { FetchUserDetailsData } from "../Redux/middleware";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

function UserDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userId = location.pathname.split("/").at(-1);

  const { darkTheme } = useSelector((store) => {
    return store.ThemeState;
  });

  const { userDetails, apiStatus } = useSelector((store) => {
    return store.UserDetailsState;
  });

  const onReturnHome = () => {
    navigate("/");
  };

  useEffect(() => {
    dispatch(FetchUserDetailsData(userId));
  }, [dispatch, userId]);

  const onFailureView = () => {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <h1 className="text-blue-400 text-xl">Failure Try Again</h1>
      </div>
    );
  };

  const onSuccessView = () => {
    const { name, email, phone, company, website } = userDetails;

    return (
      <div
        className={`p-4 shadow-md w-full lg:w-1/2 md:w-2/3 ${
          darkTheme ? "bg-gray-700" : "bg-white"
        } rounded-lg`}
      >
        <div className="mb-3 flex flex-col items-center justify-center text-[1.5rem] ">
          <FaUser className={`text-blue-400 mr-1 text-[5rem]`} />
          <h1>{name}</h1>
        </div>

        <div className="flex flex-col w-full items-center">
          <div
            className={`${
              darkTheme ? "bg-gray-500" : "bg-gray-200"
            } w-full mb-2 font-semibold  flex flex-col items-center p-2 rounded-lg`}
          >
            <div className="flex items-center">
              <MdContacts className={`text-sky-500 mr-1 text-[1.5rem]`} />
              <h1 className="text-[1.5rem] ]">Contact</h1>
            </div>

            <div className="w-full flex flex-col items-center sm:flex-row justify-around">
              <div className="flex items-center sm:ml-1">
                <MdOutlineEmail className={`text-red-500 mr-1`} />
                <p>{email}</p>
              </div>

              <div className="flex items-center sm:ml-1">
                <MdOutlinePhoneInTalk className={`text-green-500 mr-1`} />
                <p>{phone}</p>
              </div>
            </div>
          </div>

          <div className="w-full sm:flex sm:items-center sm:justify-around">
            <div
              className={`${
                darkTheme ? "bg-gray-500" : "bg-gray-200"
              } w-full mb-3 sm:mr-2 font-semibold sm:w-1/2 flex flex-col items-center p-2 rounded-lg`}
            >
              <div className="flex items-center">
                <FaBuilding className={`text-cyan-500 mr-1 text-[1.5rem]`} />
                <h1 className="text-[1.5rem] ]">Company</h1>
              </div>

              <p>{company.name}</p>
            </div>

            <div
              className={`${
                darkTheme ? "bg-gray-500" : "bg-gray-200"
              } w-full mb-3 font-semibold sm:w-1/2 flex flex-col items-center p-2 rounded-lg`}
            >
              <div className="flex items-center">
                <MdWeb className={`text-red-500 mr-1 text-[1.5rem]`} />
                <h1 className="text-[1.5rem] ]">Website</h1>
              </div>

              <p>{website}</p>
            </div>
          </div>
        </div>

        <button
          onClick={onReturnHome}
          className="flex items-center justify-center border-[2px] border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg font-semibold p-2"
        >
          <FaArrowLeft className="mr-1 cursor:pointer " />
          Go Back
        </button>
      </div>
    );
  };

  const onProgressView = () => {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <BounceLoading fill="skyblue" />
      </div>
    );
  };

  const displayUserDetails = () => {
    if (apiStatus === apiStatusConstraints.success) {
      return onSuccessView();
    } else if (apiStatus === apiStatusConstraints.failure) {
      return onFailureView();
    } else if (apiStatus === apiStatusConstraints.inProgress) {
      return onProgressView();
    } else {
      return null;
    }
  };

  return (
    <div
      className={`${
        darkTheme ? "bg-gray-950 text-white" : "bg-gray-200"
      } min-h-screen box-border w-screen flex flex-col items-center `}
    >
      <Header></Header>
      <div className="flex justify-center w-full p-[1rem]">
        {displayUserDetails()}
      </div>
    </div>
  );
}

export default UserDetail;
