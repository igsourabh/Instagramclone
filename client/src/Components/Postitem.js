import React from "react";
import { Link } from "react-router-dom";

const Postitem = (props) => {
  
  return (
    <>
      <Link to={`/singlepost/${props.id}`}>
        <div className="  overflow-hidden">
          <img
            alt="content"
            className="object-cover object-center h-28 w-36"
            src={props.image}
          />
        </div>
      </Link>
    </>
  );
};

export default Postitem;
