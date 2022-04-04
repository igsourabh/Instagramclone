import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Editprofile = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const History = useHistory();
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [userexist, setuserexist] = useState(false);
  const [updatedsucessfully, setupdatedsucessfully] = useState(false);
  const [passwordnotmatched, setpasswordnotmatched] = useState(false);
  const [passowordlength, setpassowordlength] = useState(false);
  const authtoken = localStorage.getItem("authtoken");
  const changename = (e) => {
    setname(e.target.value);
  };

  const changeusername = (e) => {
    setusername(e.target.value);
  };
  const changepassowrd = (e) => {
    setpassword(e.target.value);
  };
  const changeconfirmpassowrd = (e) => {
    setconfirmpassword(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (password && password.length < 5) {
      setpassowordlength(true);
      setTimeout(() => {
        setpassowordlength(false);
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
        authtoken: authtoken,
      },
    };
    axios
      .put(
        "/api/auth/updateuser",
        {
          name: name,
          username: username,
          password: password,
        },
        config
      )
      .then((res) => {
        if (res.data.sucess === true) {
          setuserexist(true);
          setTimeout(() => {
            setuserexist(false);
          }, 2000);
        }
        if (res.data.usersucess === true) {
          setupdatedsucessfully(true);
          setname("");
          setusername("");
          setpassword("");
          setconfirmpassword("");
          setTimeout(() => {
            setupdatedsucessfully(false);
          }, 2000);
        }
        History.push("/profile");
      });
  };

  return (
    <>
      {updatedsucessfully && (
        <div className="absolute w-full left-50">
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
                Details Sucessfully updated
              </div>
            </div>
          </div>
        </div>
      )}
      {passowordlength && (
        <div className="absolute w-full left-50">
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
                Password should contain atlest 5 character
              </div>
            </div>
          </div>
        </div>
      )}
      {passwordnotmatched && (
        <div className="absolute w-full left-50">
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
                Password combination not matched
              </div>
            </div>
          </div>
        </div>
      )}
      {userexist && (
        <div className="absolute w-full left-50">
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
                Sorry username is already exist
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handlesubmit}>
        <div className=" flex justify-center items-center mt-20">
          <div className="flex-col text-center ">
            <label htmlFor=""> Edit your details</label>
            <input
              value={name}
              onChange={changename}
              type="text"
              placeholder="Name"
              className="block border  border-gray-500 border-1 bg-gray-200  rounded-md py-2 px-5 text-center my-2 focus:bg-blue-200"
            />

            <input
              value={username}
              onChange={changeusername}
              type="text"
              placeholder="Username"
              className="block border  border-gray-500 border-1 bg-gray-200  rounded-md py-2 px-5 text-center my-2 focus:bg-blue-200"
            />
            <input
              value={password}
              onChange={changepassowrd}
              type="password"
              placeholder="Password"
              className="block border  border-gray-500 border-1 bg-gray-200  rounded-md py-2 px-5 text-center my-2 focus:bg-blue-200"
            />
            <input
              value={confirmpassword}
              onChange={changeconfirmpassowrd}
              type="password"
              placeholder="Confirm password"
              className="block border  border-gray-500 border-1 bg-gray-200  rounded-md py-2 px-5 text-center my-2 focus:bg-blue-200"
            />
            <button
              disabled={!name && !username && !password && !confirmpassword}
              className="bg-blue-500 rounded-md capitalize px-5 py-1 text-white"
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Editprofile;
