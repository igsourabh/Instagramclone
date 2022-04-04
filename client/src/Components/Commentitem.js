import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletevalue } from "../Redux/commentSlice";
const Commentitem = (props) => {
  const userid = localStorage.getItem("userid");

  const dispatch = useDispatch();

  const authtoken = localStorage.getItem("authtoken");
  // const getuserimage = () => {
  //   const config = {
  //     headers: {
  //       authtoken: authtoken,
  //       userid: props.userid,
  //     },
  //   };
  //   axios.get("/api/auth/getalluserbyid", config).then((res) => {
  //     setimage(res.data.image);
  //   });
  // };

  const remove = () => {
    dispatch(deletevalue({ commentid: props.commentid }));
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios
      .delete(`/api/auth/uncomment/${props.commentid}`, config)
      .then((res) => {});
  };

  return (
    <>
      <div className="sec flex justify-start  my-5 w-80   ">
        <div className="sec mx-2 ">
          <div className="flex ">
            <Link to={`/user/${props.userid}`}>
              <h1 className="text-lg font-semibold">{props.commentby}</h1>
            </Link>
            {userid === props.userid && (
              <button className="mx-8   " onClick={remove}>
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

          <h3 className="text-base ">{props.comment}</h3>
        </div>
      </div>
    </>
  );
};

export default Commentitem;
