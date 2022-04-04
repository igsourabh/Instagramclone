import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserFollowingitems from "./UserFollowingitems";
const UserFollowing = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const authtoken = localStorage.getItem("authtoken");

  const { id } = useParams();
  const [followersdata, setfollowersdata] = useState([]);
  const data = () => {
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios.get(`/api/auth/getmyfollowing/${id}`, config).then((res) => {
      setfollowersdata(res.data);
    });
  };
  useEffect(() => {
    data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex-grow h-fit">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl">Following</h1>
        </div>
        <div className=" bg-white mb-11 flex justify-center items-center">
          <div className=" p-4  mb-6  pt-9 pb-14  mx-auto flex-col  ">
            {followersdata.map((element, index) => {
              return (
                <UserFollowingitems
                  image={element.image}
                  key={index}
                  username={element.username}
                  userid={element._id}
                  name={element.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFollowing;
