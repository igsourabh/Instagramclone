import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { datalike } from "../Redux/likeSlice";
import { like } from "../Redux/likeSlice";
import { unlike } from "../Redux/likeSlice";
const Singlepost = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const dispatch = useDispatch();
  const History = useHistory();
  const likedata = useSelector((state) => state.likeunlike.value);
  const authtoken = localStorage.getItem("authtoken");
  const userid = localStorage.getItem("userid");
  const [username, setusername] = useState("");
  const { id } = useParams();
  const [post, setpost] = useState({});
  const [likeavilable, setlikeavilable] = useState(true);
  const [image, setimage] = useState("");
  const [postuserid, setpostuserid] = useState("");
  const [loading, setloading] = useState(false);
  const handlelike = () => {
    dispatch(like(userid));

    setlikeavilable(false);

    const config = {
      headers: {
        authtoken: authtoken,
        postid: id,
      },
    };
    axios.put("/api/auth/like", {}, config).then((res) => {});
  };
  const handleunlike = () => {
    dispatch(unlike(userid));

    setlikeavilable(true);
    const config = {
      headers: {
        authtoken: authtoken,
        postid: id,
      },
    };
    axios.put("/api/auth/unlike", {}, config).then((res) => {});
  };

  const data = () => {
    setloading(true);
    axios.get(`/api/auth/getsinglepost/${id}`).then((res) => {
      dispatch(datalike(res.data.likes));
      setpost(res.data);
      setpostuserid(res.data.user);
      const b = res.data.likes.includes(userid);
      if (b) {
        setlikeavilable(false);
      }
      const config1 = {
        headers: {
          userid: res.data.user,
        },
      };
      axios.get("/api/auth/getalluserbyid", config1).then((res) => {
        setimage(res.data.image);
        setusername(res.data.username);

        setloading(false);
      });
    });
  };
  const deletepost = () => {
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios.delete(`/api/auth/deletepost/${id}`, config).then((res) => {
      History.push("/profile");
    });
  };
  useEffect(() => {
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <div className="  flex-grow ">
        {!loading && (
          <div className="">
            <div className="bg-gray-100 p-4 h-[90vh]">
              <div className="bg-white border rounded-sm max-w-md  mx-auto  flex-grow ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center px-4 py-3 ">
                    <img
                      className="inline object-cover w-8 h-8 mr-2 rounded-full"
                      src={image}
                      alt={image}
                    />
                    <div className="ml-3 ">
                      <span className="text-sm font-semibold antialiased block leading-tight">
                        {username}
                      </span>
                      {/* <span className="text-gray-600 text-xs block">
                    Asheville, North Carolina
                  </span> */}
                    </div>
                  </div>
                  <div className="mr-4">
                    {postuserid === userid && (
                      <button onClick={deletepost} className="">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-center items-center">
                  <img
                    src={post.image}
                    className="max-h-80 "
                    alt={props.image}
                  />
                </div>
                <div className="flex items-center justify-between mx-4 mt-3 mb-2">
                  <div className="flex gap-5 items-center">
                    {/* !likeavilable means  true  */}

                    {likeavilable && (
                      <button onClick={handlelike}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-9 w-9"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    )}
                    {/* !likeavilable means  false  */}
                    {!likeavilable && (
                      <button onClick={handleunlike}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-9 w-h-9 text-red-600"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillrle="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}
                    <Link to={`/comment/${id}`}>
                      <svg
                        fill="#262626"
                        height="24"
                        viewBox="0 0 48 48"
                        width="24"
                      >
                        <path
                          clipRule="evenodd"
                          d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
                <Link to={`/likedby/${id}`}>
                  <div className="font-semibold text-sm mx-4 mt-2 ">
                    {likedata.length + " likes"}
                  </div>
                </Link>
                <div className="font-semibold text-sm mx-4 mt-1 mb-4">
                  {post.title}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Singlepost;
