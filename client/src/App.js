import Login from "./Components/Login";
import Home from "./Components/Home";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Profile from "./Components/Profile";
import Search from "./Components/Search";
import Userdetails from "./Components/Userdetails";
import Addposts from "./Components/Addposts";
import Singlepost from "./Components/Singlepost";
import Logout from "./Components/Logout";
import Editprofile from "./Components/Editprofile";
import Updatepicture from "./Components/Updatepicture";
import Comment from "./Components/Comment";
import Likedby from "./Components/Likedby";
import Signup from "./Components/Signup";
import Followers from "./Components/Followers";
import Following from "./Components/Following";
import UserFollowers from "./Components/UserFollowers";
import UserFollowing from "./Components/UserFollowing";
import Forgotpassword from "./Components/Forgotpassword";
import Createpassword from "./Components/Createpassword";
function App() {
  return (
    <>
      <Router>
        <Route component={Header} />

        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/user/:id" component={Userdetails} />
          <Route exact path="/singlepost/:id" component={Singlepost} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/addposts" component={Addposts} />
          <Route exact path="/singlepost/:id" component={Singlepost} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/updateuser" component={Editprofile} />
          <Route exact path="/updatepicture" component={Updatepicture} />
          <Route exact path="/comment/:id" component={Comment} />
          <Route exact path="/likedby/:id" component={Likedby} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/followers" component={Followers} />
          <Route exact path="/following" component={Following} />
          <Route exact path="/userfollowers/:id" component={UserFollowers} />
          <Route exact path="/userfollowing/:id" component={UserFollowing} />
          <Route exact path="/forgotpassword" component={Forgotpassword} />
          <Route exact path="/createpassword" component={Createpassword} />
        </Switch>

        <Route component={Footer} />
      </Router>
    </>
  );
}

export default App;
