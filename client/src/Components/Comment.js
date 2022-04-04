import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Commentitem from "./Commentitem";
import { addcomment } from "../Redux/commentSlice";
import { addcommentfromapi } from "../Redux/commentSlice";
import { v4 as uuidv4 } from "uuid";
import Spinner from "./Spinner";
const Comment = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }
  const { id } = useParams();
  const commentreduxdata = useSelector((state) => state.commentdata.value);
  const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("userid");
  const authtoken = localStorage.getItem("authtoken");
  const [comment, setcomment] = useState("");
  const [loading, setloading] = useState(true);
  const commentid = uuidv4();
  const commentchange = (e) => {
    setcomment(e.target.value);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    const config1 = {
      headers: {
        authtoken: authtoken,
        userid: userid,
      },
    };
    axios.get("/api/auth/getalluserbyid", config1).then((res) => {
      // setimage(res.data.image);
    });

    const a = {
      _id: id,
      comment: comment,
      userid: userid,
      commentby: username,
      commentid: commentid,
    };
    dispatch(addcommentfromapi(a));

    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios
      .put(
        `/api/auth/comment/${id}`,
        {
          comment: comment,
          commentby: username,
          commentid: commentid,
        },
        config
      )
      .then((res) => {});
  };

  const data = () => {
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios.get(`/api/auth/getallcomment/${id}`, config).then((res) => {
      dispatch(addcomment(res.data));
      setloading(false);
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="flex-grow h-fit">
        <div className=" bg-white mb-11 flex justify-center items-center">
          {!loading && (
            <div className=" p-4  mb-6   pt-9 pb-14  mx-auto flex-col  ">
              {commentreduxdata.map((element, index) => {
                return (
                  <Commentitem
                    commentid={element.commentid}
                    key={index}
                    userid={element.userid}
                    comment={element.comment}
                    commentby={element.commentby}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center bg-white items-center">
        <div className="sec fixed   bg-white w-full bottom-10">
          <form onSubmit={handelsubmit}>
            <div className=" flex justify-center items-center">
              <div className="flex text-center ">
                <input
                  onChange={commentchange}
                  value={comment}
                  type="text"
                  placeholder="comment"
                  className="block bg-gray-200  border border-1 border-black  rounded-md py-1 px-5 text-center my-2 "
                />
              </div>
              <button className="bg-blue-500 w-fit mx-1 rounded-md capitalize text-sm py-2 px-2  text-white">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Comment;
