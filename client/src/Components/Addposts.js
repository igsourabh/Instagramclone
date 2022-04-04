import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Addposts = () => {
  const authtoken = localStorage.getItem("authtoken");
  const History = useHistory();
  const [title, settitle] = useState("");
  const [pics, setPics] = useState();
  const [user, setuser] = useState([]);
  const Authtoken = localStorage.getItem("authtoken");
  const [imageloading, setimageloading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (imageloading === true) {
      alert("wait");
      return;
    }
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        authtoken: Authtoken,
      },
    };
    axios
      .post(
        "/api/auth/createpost",
        {
          title: title,
          image: pics,
          createdby: user.username,
          userimage: user.image,
        },
        config
      )
      .then((res) => {
        History.push("/profile");
      });
  };
  const titlechange = (e) => {
    settitle(e.target.value);
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
  const userdata = () => {
    // my follower details
    const config = {
      headers: {
        "Content-type": "application/json",
        authtoken: authtoken,
      },
    };
    axios.get("/api/auth/getmydetails", config).then((res) => {
      setuser(res.data);
    });
  };
  useEffect(() => {
    userdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="  flex-grow">
        <form onSubmit={submit}>
          <div className="section flex-col justify-center p-9 item-center">
            <div className="flex justify-center">
              <div className="mb-3 w-96">
                <h1 className="text-center text-2xl ">Upload new post</h1>
                <input
                  className="form-control block w-full px-3  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 "
                  type="file"
                  accept="image/*"
                  onChange={(e) => imagedetails(e.target.files[0])}
                  id="formFile"
                />
              </div>
            </div>

            <div className="flex justify-center ">
              <div className="mb-3 w-96">
                <input
                  onChange={titlechange}
                  className=" border border-1 border-blue-500  w-full text-center p-2 rounded-md "
                  type="text "
                  id="formFile"
                  placeholder="Enter your title "
                />
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="mb-3 w-96">
                <button className="bg-blue-400 text-white px-2 py-1 text-lg rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addposts;
