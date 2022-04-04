import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Postitem from "./Postitem";
import Spinner from "./Spinner";
import { setusername } from "../Redux/usernameSlice";

const Profile = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const [user, setuser] = useState({});
  const [userfollower, setuserfollower] = useState([]);
  const [userfollwowing, setuserfollwowing] = useState([]);
  const [totalpost, settotalpost] = useState([]);
  const [loading, setloading] = useState(false);
  const authtoken = localStorage.getItem("authtoken");
  const dispatch = useDispatch();
  const userdata = () => {
    setloading(true);
    // my follower details
    const config = {
      headers: {
        "Content-type": "application/json",
        authtoken: authtoken,
      },
    };
    axios.get("/api/auth/getmydetails", config).then((res) => {
      setuser(res.data);
      setuserfollower(res.data.followers);
      dispatch(setusername(res.data.username));
      localStorage.setItem("image", res.data.image);
      localStorage.setItem("username", res.data.username);

      setuserfollwowing(res.data.following);
    });
    setloading(true);

    // my posts details
    axios.get("/api/auth/getownpost", config).then((res) => {
      settotalpost(res.data.reverse());
      setTimeout(() => {
        setloading(false);
      }, 500);
    });
  };

  useEffect(() => {
    userdata();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading && (
        <div className="spinner flex justify-center items-center  ">
          <div className="s mt-52 ">
            <Spinner />
          </div>
        </div>
      )}
      <div className="flex-grow ">
        {!loading && (
          <div className="details md:w-[30%] md:mx-auto">
            <div className="profiledetails flex justify-around py-6 border-b border-gray-200 items-center">
              <div className="relative w-24 h-24">
                <img
                  className="inline object-cover w-24 h-24 mr-2 rounded-full"
                  src={user.image}
                  alt={user.image}
                />
                <Link to="/updatepicture">
                  <div className="absolute top-0 right-0 h-6 w-6 my-1 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" "
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </div>

              <div className="username flex-col items-center justify-center">
                <h1 className="text-lg font-semibold">{user.username}</h1>
                <Link to="/updateuser">
                  <button className=" px-10 w-full  rounded-md font-semibold  border border-1 border-black">
                    edit profile
                  </button>
                </Link>
                <div className="sec flex">
                  <div className="count mx-1 flex-col text-base text-center font-semibold">
                    Posts
                    <div className="total font-semibold text-lg">
                      {totalpost.length}
                    </div>
                  </div>
                  <Link to="/followers">
                    <div className="count mx-1 flex-col text-base text-center font-semibold">
                      Followers
                      <div className="total font-semibold text-lg">
                        {userfollower.length}
                      </div>
                    </div>
                  </Link>
                  <Link to="/following">
                    <div className="count mx-1 flex-col text-base text-center font-semibold">
                      Following
                      <div className="total font-semibold text-lg">
                        {userfollwowing.length}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-3 gap-1 place-items-center md:w-[30%] px-2 md:mx-auto">
            {totalpost.map((element, index) => {
              return (
                <Postitem image={element.image} id={element._id} key={index} />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
