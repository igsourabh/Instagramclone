import React from "react";
import { Link } from "react-router-dom";
const Searchitem = (props) => {
  return (
    <>
      <Link to={`/user/${props.id}`}>
    

    <div className="sec flex my-5 justify-start items-center ">
      <img src={props.image} className="h-14 w-14 rounded-full ml-3 mr-5 " alt={props.image}/>
      <div className="details">
        <h1 className="text-base font-semibold">{props.username}</h1>
        <h3 className="text-sm font-medium text-gray-500">{props.name}</h3>
      </div>
    </div>
    
      </Link>
    </>
  );
};

export default Searchitem;
