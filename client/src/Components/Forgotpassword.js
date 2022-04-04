import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const Forgotpassword = (props) => {
  let history = useHistory();
  const [email, setemail] = useState("");
  const [usernotexist, setusernotexist] = useState(false);
  const changeemail = (e) => {
    setemail(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("/api/auth/reset-password", {
        email: email,
      })
      .then((res) => {
        // console.log(email);
        // console.log(res.data);
        if (res.data.status === 404) {
          setusernotexist(true);
          setTimeout(() => {
            setusernotexist(false);
          }, 2000);
          return;
        }
        history.push({
          pathname: "/createpassword",
          // search: "?query=abc",
          state: res.data,
        });
      });
  };

  return (
    <>
      {usernotexist && (
        <div className="absolute w-full top-5 left-50">
          <div className="flex  justify-center  items-center">
            <div className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2">
              <div className="text-red-500 rounded-full bg-white mr-3">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 16 16"
                  className="bi bi-x"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  />
                </svg>
              </div>

              <div className="text-white max-w capitalize ">User not found</div>
            </div>
          </div>
        </div>
      )}
      <div className="flex  justify-center items-center">
        <div className="box md:outline md:outline-1 outline-gray-200 w-64 sm:w-96 p-7 rounded-md mt-12">
          <Link to="/">
            <h1 className="text-5xl text-center font-serif">Instagram</h1>
          </Link>
          <hr />
          <h1 className="text-center text-xl capitalize">reset password</h1>
          <form onSubmit={submit}>
            <div className="form my-6">
            <input
                  onChange={changeemail}
                  value={email}
                  className="my-1 shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="email"
                  placeholder="email "
                />
          
            </div>

            <div className="button items-center justify-center flex my-3">
              <button className="bg-[#0095f6] py-1 px-24  rounded-md text-white capitalize text-xs md:text-sm">
                submit
              </button>
            </div>
            <div className="flex justify-end">
              <Link
                className="inline-block text-sm text-blue-400 text-left"
                to="/"
              >
                Login
              </Link>
              <p className="mx-1 text-sm text-blue-400">/</p>
              <Link
                className="inline-block text-sm text-blue-400 text-left"
                to="/signup"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forgotpassword;
