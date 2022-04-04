import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Updatepicture = (props) => {
  const Authtoken = localStorage.getItem("authtoken");
  if (!Authtoken) {
    props.history.push("/");
  }

  const History = useHistory();
  const authtoken = localStorage.getItem("authtoken");
  const [pics, setPics] = useState("");
  const [imageloading, setimageloading] = useState(false);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (imageloading === true) {
      alert("wait");
      return;
    }
    const config = {
      headers: {
        authtoken: authtoken,
      },
    };
    axios
      .put(
        "/api/auth/updateuser",
        {
          image: pics,
        },
        config
      )
      .then((res) => {
        History.push("/profile");
      });
  };
  const imagedetails = (pics) => {
    setimageloading(true);

    if (pics === undefined) {
      alert("undefined");
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatapp");
      data.append("cloud_name", "sourabhvaish");
      fetch("https://api.cloudinary.com/v1_1/sourabhvaish/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPics(data.url.toString());
          setimageloading(false);
        })
        .catch((err) => {});
    }
  };

  return (
    <>
      <form onSubmit={handlesubmit}>
        <div className="main flex-col p-7 justify-center item-center h-screen">
          <div className="flex justify-center">
            <div className="mb-3 w-96">
              <h1 className="text-center text-2xl ">Update profile pic</h1>
              <input
                onChange={(e) => imagedetails(e.target.files[0])}
                className="form-control block w-full px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 "
                type="file"
                accept="image/*"
                id="formFile"
              />
            </div>
          </div>
          <button className="bg-blue-500 block rounded-lg px-5 py-1 w-[50%] mx-auto text-white ">
            submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Updatepicture;
