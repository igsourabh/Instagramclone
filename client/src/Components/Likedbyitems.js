import React from "react";
import { Link } from "react-router-dom";

const Likedbyitems = (props) => {
  return (
    <>
      <Link to={`/user/${props.userid}`}>
        <div className="sec flex justify-start  my-5 w-80   ">
          <div className="sec mx-2 ">
            <div className="flex ">
              <img
                className="inline object-cover w-12 h-12 mx-3 rounded-full"
                src={props.image}
                alt={props.image}
              />
              <div>
                <h1 className="text-lg font-semibold">{props.username}</h1>
                <h1 className="text-xs font-semibold">{props.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Likedbyitems;
