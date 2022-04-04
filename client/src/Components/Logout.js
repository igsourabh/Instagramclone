import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {  resetsearch } from "../Redux/searchslice";

const Logout = (props) => {
  const dispatch = useDispatch();
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const History = useHistory();
  const handlelogout = () => {
    dispatch(resetsearch());

    localStorage.removeItem("authtoken");
    localStorage.removeItem("userid");
    localStorage.removeItem("image");
    localStorage.removeItem("username");
    History.push("/");
  };
  return (
    <>
      <div className="main flex justify-center items-center mt-64 ">
        <button
          onClick={handlelogout}
          className="bg-blue-500 md:w-72 w-1/2 px-2 py-1 text-white rounded-lg "
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
