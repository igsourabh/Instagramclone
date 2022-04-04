const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();
const User = require("../model/userSchema");

const Post = require("../model/postSchmea");
// follow

router.put("/follow/:id", fetchuser, async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(req.params.id);
  const userfollow = user.followers;
  let result = userfollow.includes(id);
  if (result == true) {
    console.log(user);
    return res.send("not");
  }
  // for followers
  const follow = await User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { followers: id },
    },
    {
      new: true,
    }
  )
    .select("-password")
    .select("-email")
    .select("-__v");

  // for following
  const following = await User.findByIdAndUpdate(
    id,
    {
      $push: { following: req.params.id },
    },
    {
      new: true,
    }
  )
    .select("-password")
    .select("-email")
    .select("-__v");
  res.json({ following, follow });
});
router.put("/unfollow/:id", fetchuser, async (req, res) => {
  // this is my user id
  const id = req.user.id;
  // this is person user id which i follow
  const user = await User.findById(req.params.id);
  const userfollow = user.followers;
  let result = userfollow.includes(id);
  if (result == false) {
    console.log(user);
    return res.send("not");
  }
  const follow = await User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { followers: id },
    },
    {
      new: true,
    }
  )
    .select("-password")
    .select("-email")
    .select("-__v");

  // unfollow
  const following = await User.findByIdAndUpdate(
    id,
    {
      $pull: { following: req.params.id },
    },
    {
      new: true,
    }
  )
    .select("-password")
    .select("-email")
    .select("-__v");
  res.json({ following, follow });
});
router.get("/getmyfollowers/:id", fetchuser, async (req, res) => {
  const userid = req.params.id;
  const id = await User.findById(userid);
  const userpost = await User.find({ _id: id.followers })
    .select("-__v")
    .select("-password")
    .select("-email");
  res.json(userpost);
});
router.get("/getmyfollowing/:id", fetchuser, async (req, res) => {
  const userid = req.params.id;
  const id = await User.findById(userid);
  const userpost = await User.find({ _id: id.following })
    .select("-__v")
    .select("-password")
    .select("-email");
  res.json(userpost);
});
module.exports = router;
