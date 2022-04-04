import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Postitem from "./Postitem";
import Spinner from "./Spinner";
const Userdetails = () => {
  const { id } = useParams();


  const [user, setuser] = useState({});
  const [userfollower, setuserfollower] = useState([]);
  const [userfollwowing, setuserfollwowing] = useState([]);
  const [totalpost, settotalpost] = useState([]);
  const [followingexist, setfollowingexist] = useState(true);
  const authtoken = localStorage.getItem("authtoken");
  const userid = localStorage.getItem("userid");
  const [loading, setloading] = useState(false);
  const [match, setmatch] = useState(true);
  const userdata = (props) => {
      
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
    setloading(true);
    const config = {
      headers: {
        userid: id,
      },
    };
    axios.get("/api/auth/getalluserbyid", config).then((res) => {
      setuser(res.data);
      setuserfollower(res.data.followers);
      setuserfollwowing(res.data.following);
      const b = res.data.followers.includes(userid);
      if (b) {
        setfollowingexist(false);
      }
      if (userid === res.data._id) {
        setmatch(false);
      }
    });

    axios.get("/api/auth/singleuserpost", config).then((res) => {
      settotalpost(res.data.reverse());
    });
    setTimeout(() => {
      setloading(false);
    }, 1000);
  };
  const handlefollow = () => {
    setfollowingexist(false);

    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios.put(`/api/auth/follow/${id}`, {}, config).then((res) => {
    });
  };
  const handleunfollow = () => {
    setfollowingexist(true);

    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios.put(`/api/auth/unfollow/${id}`, {}, config).then((res) => {
    });
  };

  useEffect(() => {
    userdata();
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
      <div className="  flex-grow">
        
      </div>
      {!loading && (
        <div className="details md:w-[30%] md:mx-auto">
          <div className="profiledetails flex justify-around py-6 border-b border-gray-200 items-center">
            <div className="relative w-24 h-24">
              <img
                className="inline object-cover w-24 h-24 mr-2 rounded-full"
                src={user.image}
                alt="Profile"
              />
            </div>
            <div className="usernames flex-col items-center justify-center">
              <h1 className="font-semibold">{user.username}</h1>
              <div hidden={match === false}>
                {followingexist && (
                  <button
                    onClick={handlefollow}
                    className="border px-7 bg-blue-500  text-white w-full border-1 rounded-md font-semibold "
                  >
                    Follow
                  </button>
                )}
                {!followingexist && (
                  <button
                    onClick={handleunfollow}
                    className="border px-7 bg-white border-black text-black w-full border-1 rounded-md font-semibold "
                  >
                    Unfollow
                  </button>
                )}
              </div>

              <div className="sec flex">
                <div className="count mx-1 flex-col text-center font-semibold">
                  Posts
                  <div className="total font-semibold text-lg">
                    {totalpost.length}
                  </div>
                </div>
                <Link to={`/userfollowers/${id}`}>
                  <div className="count mx-1 flex-col text-base text-center font-semibold">
                    Followers
                    <div className="total font-semibold text-lg">
                      {userfollower.length}
                    </div>
                  </div>
                </Link>

                <Link to={`/userfollowing/${id}`}>
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
        <div className=" grid grid-cols-3 gap-1 place-items-center md:w-[30%] px-2 md:mx-auto">
          {totalpost.map((element, index) => {
            return (
              <Postitem image={element.image} id={element._id} key={index} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Userdetails;
