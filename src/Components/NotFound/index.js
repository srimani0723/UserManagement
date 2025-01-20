import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  const onReturnHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-300 h-screen flex flex-col items-center justify-center">
      <h1 className="text-xl text-blue-500 font-semifold mb-3">
        Page Not Found
      </h1>
      <button
        onClick={onReturnHome}
        className="flex items-center justify-center border-[2px] border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 rounded-lg font-semibold p-2"
      >
        <FaArrowLeft className="mr-1 cursor:pointer " />
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
