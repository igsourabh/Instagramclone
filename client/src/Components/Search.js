import axios from "axios";
import React, { useState } from "react";
import Searchitem from "./Searchitem";
import { addsearch, resetsearch } from "../Redux/searchslice";
import { useDispatch, useSelector } from "react-redux";
const Search = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const dispatch = useDispatch();
  const searchdata = useSelector((state) => state.search.value);
  const [search, setsearch] = useState("");
  const authtoken = localStorage.getItem("authtoken");
  const handelchange = (e) => {
    setsearch(e.target.value);
  };
  const handelsubmit = () => {
    const config = {
      headers: {
        authtoken: authtoken,
        search: search,
      },
    };
    axios.get(`/api/auth/searchuser?search=${search}`, config).then((res) => {
      dispatch(addsearch(res.data));
    });
  };

  const handelback = () => {
    dispatch(resetsearch());
  };
  return (
    <>
      <div className="flex-grow  ">
        <div className="header flex justify-center items-center bg-white p-1 border-b">
          <button onClick={handelback}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="mx-1"> Search </h1>{" "}
          <input
            onChange={handelchange}
            value={search}
            className=" mx-1  border border-1 border-black bg-gray-200 rounded-md w-2/3 "
            type="text"
          />
          <button onClick={handelsubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        {searchdata.map((element, index) => {
          return (
            <Searchitem
              key={index}
              name={element.name}
              image={element.image}
              username={element.username}
              id={element._id}
            />
          );
        })}
      </div>
    </>
  );
};

export default Search;
