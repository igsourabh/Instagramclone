import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { datalike } from "../Redux/likeSlice";
const Homeiitem = (props) => {
  const dispatch = useDispatch();
  const authtoken = localStorage.getItem("authtoken");
  const [likecount, setlikecount] = useState(props.likes);
  const [likeavilable, setlikeavilable] = useState(true);

  const userid = localStorage.getItem("userid");
  const [image, setimage] = useState("");
  const handlelike = () => {
    const config = {
      headers: {
        authtoken: authtoken,
        postid: props.id,
      },
    };
    axios.put("/api/auth/like", {}, config).then((res) => {
      setlikecount(res.data.data.likes);
    });

    setlikeavilable(false);
  };
  const handleunlike = () => {
    const config = {
      headers: {
        authtoken: authtoken,
        postid: props.id,
      },
    };
    axios.put("/api/auth/unlike", {}, config).then((res) => {
      setlikecount(res.data.likes);
    });

    setlikeavilable(true);
  };

  // gettiem user image for single post logo iamge

  const likedbydata = () => {
    const config = {
      headers: {
        userid: props.userid,
      },
    };
    axios.get("/api/auth/getalluserbyid", config).then((res) => {
      setimage(res.data.image);
    });
    axios.get(`/api/auth/getsinglepost/${props.id}`).then((res) => {
      dispatch(datalike(res.data.likes));
    });
  };
  useEffect(() => {
    likedbydata();
    if (props.data.likes.includes(userid)) {
      setlikeavilable(false);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-white border rounded-sm max-w-md  mx-auto  flex-grow ">
        <Link to={`/user/${props.userid}`}>
          <div className="flex items-center px-4 py-3 ">
            <img
              className="inline object-cover w-8 h-8 mr-2 rounded-full"
              src={image}
              alt="user profile"
            />
            <div className="ml-3 ">
              <span className="text-sm font-semibold antialiased block leading-tight">
                {props.username}
              </span>
              {/* <span className="text-gray-600 text-xs block">
                Asheville, North Carolina
              </span> */}
            </div>
          </div>
        </Link>
        <div className="flex justify-center items-center">
          <img src={props.image} className="max-h-80 " alt={props.image} />
        </div>
        <div className="flex items-center justify-between mx-4 mt-3 mb-2">
          <div className="flex gap-5 items-center">
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

            <Link to={`/comment/${props.id}`}>
              <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                <path
                  clipRule="evenodd"
                  d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        <Link to={`/likedby/${props.id}`}>
          <div className="font-semibold text-sm mx-4 mt-2 ">
            {likecount.length + " likes"}
          </div>
        </Link>
        <div className="font-semibold text-sm mx-4 mt-1 mb-4">
          {props.title}
        </div>
      </div>
    </>
  );
};

export default Homeiitem;
