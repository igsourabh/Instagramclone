import axios from "axios";

import React, { useEffect, useState } from "react";
import Homeiitem from "./Homeiitem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = (props) => {
  const [userpost, setuserpost] = useState([]);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [totalpost, settotalpost] = useState();
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const data = () => {
    setloading(true);
    const config = {
      headers: {
        authtoken: Authtoken,
      },
    };
    axios
      .get(`/api/auth/getpostuserifollow?page=${page}`, config)
      .then((res) => {
        setuserpost(res.data.userpost);
        settotalpost(res.data.totalpost);
        setloading(false);
      });
  };
  const fetchMoreData = async () => {
    const config = {
      headers: {
        authtoken: Authtoken,
      },
    };
    axios
      .get(`/api/auth/getpostuserifollow?page=${page + 1}`, config)
      .then((res) => {
        setpage(page + 1);
        setuserpost(userpost.concat(res.data.userpost));
        settotalpost(res.data.totalpost);
      });
  };
  useEffect(() => {
    data();
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
      {!loading && (
        <InfiniteScroll
          dataLength={userpost.length}
          next={fetchMoreData}
          hasMore={userpost.length !== totalpost}
        >
          <div className="">
            <div className="bg-gray-100 p-4   pt-9 pb-14">
              {userpost.map((element, index) => {
                return (
                  <Homeiitem
                    data={element}
                    index={index}
                    image={element.image}
                    userimage={element.userimage}
                    id={element._id}
                    title={element.title}
                    userid={element.user}
                    username={element.createdby}
                    likes={element.likes}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

export default Home;
