import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
const Createpassword = (props) => {
  const history = useHistory();
  const { state } = useLocation();
  //   const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confrimpassword, setconfrimpassword] = useState("");
  const [otp, setotp] = useState("");
  const [wrongotp, setwrongotp] = useState(false);
  const [timeexpire, settimeexpire] = useState(false);
  const changepassword = (e) => {
    setpassword(e.target.value);
  };
  const changeconfirmpassword = (e) => {
    setconfrimpassword(e.target.value);
  };
  const changeotp = (e) => {
    setotp(e.target.value);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    if (password === confrimpassword) {
    } else {
      alert("password combination not matched");
      return;
    }
    axios
      .post("/api/auth/change-password", {
        email: state.email,
        expirein: state.expirein,
        otp: otp,
        password: password,
      })
      .then((res) => {
        if (res.data.status === 500) {
          setwrongotp(true);
          setTimeout(() => {
            setwrongotp(false);
          }, 2000);
          return;
        }
        if (res.data.status === 402) {
          settimeexpire(true);
          setTimeout(() => {
            settimeexpire(false);
          }, 2000);
          return;
        }
        history.replace({ state: "" });
        history.push({
          pathname: "/",
          // search: "?query=abc",
          state: true,
        });
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      {timeexpire && (
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

              <div className="text-white max-w-xs ">Wrong otp</div>
            </div>
          </div>
        </div>
      )}
      {wrongotp && (
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

              <div className="text-white max-w-xs ">Wrong otp</div>
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

          <form onSubmit={handelsubmit}>
            <div className="form my-6 items-center flex-col justify-center">
              <input
                onChange={changepassword}
                value={password}
                className=" shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                type="password"
                placeholder="passowrd "
              />
            </div>
            <input
              onChange={changeconfirmpassword}
              value={confrimpassword}
              className=" shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
              type="password"
              placeholder="confirm password "
            />

            <div className="mx-auto my-7  flex justify-center items-center">
              <input
                maxLength={4}
                onChange={changeotp}
                value={otp}
                className="mx-auto shadow appearance-none border rounded w-20 py-2 text-center  text-sm  text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                type="text"
                placeholder=" otp "
              />
            </div>
            <div className="button items-center justify-center flex my-3">
              <button className="bg-[#0095f6] py-1 px-8 rounded-md text-white capitalize text-lg md:text-lg">
                reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Createpassword;
