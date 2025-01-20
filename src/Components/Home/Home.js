import React, { useEffect } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import UserSlice from "../Redux/UserSlice";
import { FetchUserData } from "../Redux/middleware";
import { BounceLoading } from "respinner";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import UserCard from "../UserCard";

const apiStatusConstraints = {
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
  initial: "INITIAL",
};

function Home() {
  const { darkTheme } = useSelector((store) => {
    return store.ThemeState;
  });

  const { filteredList, apiStatus, inputValue, pageNumber } = useSelector(
    (store) => {
      return store.UserState;
    }
  );

  const dispatch = useDispatch();
  const action = UserSlice.actions;

  useEffect(() => {
    dispatch(FetchUserData);
  }, [dispatch]);

  const onTypeSearch = (event) => {
    const typedText = event.target.value;

    dispatch(action.getInputValue(typedText));
  };

  const getSortingOption = (event) => {
    dispatch(action.setSort(event.target.value));
  };

  const onPageIncrement = () => {
    dispatch(action.pageIncrement());
  };

  const onPageDecrement = () => {
    dispatch(action.pageDecrement());
  };

  const onFailureView = () => {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <h1 className="text-blue-400 text-xl">Failure Try Again</h1>
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

  const onSuccessView = () => {
    const pageSize = 3;

    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;

    const filteredUserList = filteredList.filter((each) =>
      each.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    const totalPages = Math.ceil(filteredUserList.length / pageSize);

    const paginatedList = filteredUserList.slice(start, end);

    const listLength = filteredUserList.length > 0;
    return listLength ? (
      <div className="flex-col">
        <ul className="sm:min-h-[61vh] min-h-[55vh] flex-col items-center justify-between p-3">
          {paginatedList.map((each) => (
            <UserCard key={each.id} user={each} />
          ))}
        </ul>

        <div className={`flex items-center justify-center w-full `}>
          <button
            onClick={onPageDecrement}
            disabled={pageNumber === 1 ? true : false}
            className={`${
              darkTheme ? "bg-gray-700" : "bg-white"
            } p-2 rounded-lg outline-none cursor-pointer border-[2px] border-transparent hover:border-blue-400 `}
          >
            <FaArrowLeft className="text-blue-400" />
          </button>

          <p className="text-blue-400 font-bold ml-2 mr-2">{pageNumber}</p>

          <button
            onClick={onPageIncrement}
            disabled={pageNumber === totalPages ? true : false}
            className={`${
              darkTheme ? "bg-gray-700" : "bg-white"
            } p-2 rounded-lg outline-none cursor-pointer border-[2px] border-transparent hover:border-blue-400 `}
          >
            <FaArrowRight className="text-blue-400" />
          </button>
        </div>
      </div>
    ) : (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <h1 className="text-blue-400 font-bold text-xl">Empty Users</h1>
      </div>
    );
  };

  const displayAllUsers = () => {
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
      className={`box-border ${
        darkTheme ? "bg-gray-950 text-white" : "bg-gray-200"
      } min-h-screen flex-col items-center justify-center`}
    >
      <Header></Header>
      <div className="flex justify-center">
        <div className="p-[1rem] max-w-screen-lg w-full ">
          <h1
            className={`text-[1.5rem] sm:text-[2rem] mb-2 font-semibold text-blue-500`}
          >
            Users
          </h1>
          <form
            className={`flex flex-col sm:flex-row items-center justify-between w-full`}
          >
            <input
              type="search"
              className={`p-2 pl-4 pr-4 text-lg w-full rounded-lg ${
                darkTheme ? "bg-gray-600 text-white" : "bg-white"
              } text-black outline-none border border-transparent border-[2px] focus:border-blue-400 shadow-md mb-2 sm:m-0`}
              placeholder="search user ... "
              onChange={onTypeSearch}
              value={inputValue}
            />
            <select
              className={`ml-0 sm:ml-2 p-3 rounded-lg outline-none ${
                darkTheme ? "bg-gray-600 text-white" : "bg-white"
              } font-semibold shadow-md w-full sm:w-1/4`}
              onChange={getSortingOption}
            >
              <option value="relevant">Relevant</option>
              <option value="A-Z">Sort by A-Z</option>
              <option value="Z-A">Sort by Z-A</option>
            </select>
          </form>
          <div className="w-full pt-[1rem]">{displayAllUsers()}</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
