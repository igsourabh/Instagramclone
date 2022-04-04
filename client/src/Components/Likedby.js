import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Likedbyitems from "./Likedbyitems";
import Spinner from "./Spinner";
const Likedby = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const { id } = useParams();
  const authtoken = localStorage.getItem("authtoken");
  const [loading, setloading] = useState(false);
  const [likdebydata, setlikdebydata] = useState([]);
  const data = () => {
    setloading(true);
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios
      .get(`/api/auth/getsinglepostlikedby/${id}`, {}, config)
      .then((res) => {
        setlikdebydata(res.data);
        setloading(false);
      });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="flex-grow h-fit">
        {!loading && (
          <div className=" bg-white mb-11 flex justify-center items-center">
            <div className=" p-4  mb-6  pt-9 pb-14  mx-auto flex-col  ">
              {likdebydata.map((element, index) => {
                return (
                  <Likedbyitems
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
        )}
      </div>
    </>
  );
};

export default Likedby;
