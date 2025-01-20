import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

import React from "react";
import ThemeSlice from "../Redux/ThemeSlice";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const { darkTheme } = useSelector((store) => {
    return store.ThemeState;
  });
  const dispatch = useDispatch();
  const action = ThemeSlice.actions;

  const onClickToggleTheme = () => {
    dispatch(action.toggleTheme());
  };

  return (
    <nav
      className={`${
        darkTheme ? "bg-gray-800" : "bg-white"
      }  h-[10vh] w-[100%] p-3 flex justify-center border-b-[1px] ${
        darkTheme ? "border-gray-600" : "border-gray-400"
      } shadow-md`}
    >
      <div className="max-w-screen-lg flex flex-row items-center justify-between w-[100%]">
        <h1 className="font-bold text-lg">User Management</h1>
        <button
          onClick={onClickToggleTheme}
          className={`${
            darkTheme ? "bg-gray-600" : "bg-gray-200"
          } border border-none rounded-full p-2 cursor:pointer`}
        >
          {darkTheme ? (
            <CiLight className="text-[1.5rem]" />
          ) : (
            <MdDarkMode className="text-[1.5rem] text-gray-650" />
          )}
        </button>
      </div>
    </nav>
  );
}

export default Header;
