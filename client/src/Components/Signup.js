import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
const Signup = (props) => {
  const History = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [name, setname] = useState("");

  const [passwordnotmatched, setpasswordnotmatched] = useState(false);
  const [usernameexist, setusernameexist] = useState("");
  const [emailexist, setemailexist] = useState("");
  const [passwordlength, setpasswordlength] = useState(false);
  const [createdsucesfully, setcreatedsucesfully] = useState(false);
  const authtoken = localStorage.getItem("authtoken");
  const [namelength, setnamelength] = useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const emailchange = (e) => {
    setemail(e.target.value);
  };
  const passwordchange = (e) => {
    setpassword(e.target.value);
  };
  const usernamechange = (e) => {
    setusername(e.target.value);
  };
  const namechange = (e) => {
    setname(e.target.value);
  };
  const confirmpasswordchange = (e) => {
    setconfirmpassword(e.target.value);
  };
  const handelsubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) {
      setnamelength(true);
      setTimeout(() => {
        setnamelength(false);
      }, 2000);
      return;
    }
    if (!regex.test(email)) {
      alert("enter a valid email");
      return;
    }

    if (password && password.length < 5) {
      setpasswordlength(true);
      setTimeout(() => {
        setpasswordlength(false);
      }, 2000);
      return;
    }
    if (password === confirmpassword) {
    } else {
      setpasswordnotmatched(true);
      setTimeout(() => {
        setpasswordnotmatched(false);
      }, 2000);

      return;
    }

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        "/api/auth/createuser",
        {
          name,
          username,
          email,
          password,
        },
        config
      )
      .then((res) => {
        if (res.data.usernameexist) {
          setusernameexist(true);
          setTimeout(() => {
            setusernameexist(false);
          }, 2000);
          return;
        }
        if (res.data.emailexist) {
          setemailexist(true);
          setTimeout(() => {
            setemailexist(false);
          }, 2000);
          return;
        }
        if (res.data.sucess === true) {
          setcreatedsucesfully(true);
          setTimeout(() => {
            setcreatedsucesfully(false);
            props.history.push("/");
          }, 2000);
          return;
        }
      });
  };
  if (authtoken) {
    History.push("/profile");
  }
  return (
    <>
      {createdsucesfully && (
        <div className="absolute w-full top-5  left-50">
          <div className="flex  justify-center  items-center">
            <div className="flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2">
              <div className="text-green-500 rounded-full bg-white mr-3">
                <svg
                  width="1.8em"
                  height="1.8em"
                  viewBox="0 0 16 16"
                  className="bi bi-check"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
                  />
                </svg>
              </div>

              <div className="text-white max-w-xs ">
                Usercreated sucessfully
              </div>
            </div>
          </div>
        </div>
      )}
      {namelength && (
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

              <div className="text-white max-w-xs capitalize">
                Name should contain atleast 3 character
              </div>
            </div>
          </div>
        </div>
      )}
      {usernameexist && (
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

              <div className="text-white max-w-xs ">
                User with this username is already exist
              </div>
            </div>
          </div>
        </div>
      )}
      {emailexist && (
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

              <div className="text-white max-w-xs ">
                User with this email is already exist
              </div>
            </div>
          </div>
        </div>
      )}
      {passwordnotmatched && (
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

              <div className="text-white max-w-xs ">
                Password combination doesn't matched
              </div>
            </div>
          </div>
        </div>
      )}
      {passwordlength && (
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

              <div className="text-white max-w-xs ">
                Password should contain atleast 5 character
              </div>
            </div>
          </div>
        </div>
      )}

      {!authtoken && (
        <div className="flex  justify-center items-center">
          <div className="box md:outline md:outline-1 outline-gray-200 w-64 sm:w-96 p-7 rounded-md mt-12">
            <Link to="/">
              <h1 className="text-5xl text-center font-serif">Instagram</h1>
            </Link>
            <hr />

            <div className="button items-center justify-center flex my-3">
              <button className="bg-[#0095f6] py-1 px-8 rounded-md text-white capitalize text-xs md:text-sm">
                sign in with facebook
              </button>
            </div>
            <div className="or flex justify-center items-center">
              <h1>or</h1>
            </div>
            <form onSubmit={handelsubmit}>
              <div className="form">
                <input
                  onChange={namechange}
                  value={name}
                  className="my-1 shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="text"
                  placeholder="name "
                />
                <input
                  onChange={usernamechange}
                  value={username}
                  className="my-1 shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="text"
                  placeholder="username "
                />
                <input
                  onChange={emailchange}
                  value={email}
                  className="my-1 shadow appearance-none border rounded w-full py-2 text-sm px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="email"
                  placeholder="email and username "
                />
                <input
                  onChange={passwordchange}
                  value={password}
                  className="my-1 shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="password"
                  placeholder=" password"
                />
                <input
                  onChange={confirmpasswordchange}
                  value={confirmpassword}
                  className="my-1 shadow appearance-none border rounded w-full text-sm py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-blue-300"
                  type="password"
                  placeholder="confirm password"
                />
              </div>
              <div className="flex justify-end">
                <Link
                  to="/forgotpassword"
                  className="inline-block text-sm text-blue-400 text-left"
                >
                  forgot password
                </Link>
              </div>
              <div className="button items-center justify-center flex my-3">
                <button
                  disabled={
                    !name &&
                    !username &&
                    !email &&
                    !password &&
                    !confirmpassword
                  }
                  className="bg-[#0095f6] w-52 py-1  rounded-md text-white capitalize text-xs md:text-sm"
                >
                  Sign up
                </button>
              </div>
              <div className="flex justify-end">
                <Link
                  className="inline-block text-sm text-blue-400 text-left"
                  to="/"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
