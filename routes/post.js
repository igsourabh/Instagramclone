const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const router = express.Router();
const User = require("../model/userSchema");

const Post = require("../model/postSchmea");
router.post("/createpost", fetchuser, async (req, res) => {
  const { title, image, likes, createdby, userimage } = req.body;

  const user = await User.findById(req.user.id);
  const { name } = user;
  const post = await new Post({
    title,
    image,
    likes,
    user: req.user.id,
    createdby,
    userimage,
  });
  post.save();

  res.json(post);
});

// get own posts
router.get("/getownpost", fetchuser, async (req, res) => {
  const id = req.user.id;
  const userpost = await Post.find({ user: id });
  res.json(userpost);
});

router.get("/getsinglepost/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "not found" });
  }
  const singleposts = await Post.findById({ _id: id });
  res.json(singleposts);
});

router.get("/getsinglepostlikedby/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "not found" });
  }
  const singleposts = await Post.findById({ _id: id });
  const finduser = await User.find({ _id: singleposts.likes });
  res.json(finduser);
});

// get users posts
router.get("/getallpost", async (req, res) => {
  const userid = req.header("user");
  if (!userid) {
    return res.status(400).json({ error: "not found" });
  }
  const userpost = await Post.find({ user: userid }).select("-__v");
  res.json(userpost);
});

router.get("/singleuserpost", async (req, res) => {
  const user = req.header("userid");
  if (!user) {
    return res.status(400).json({ error: "not found" });
  }

  const userpost = await Post.find({ user: user });
  res.json(userpost);
});
// get user post i follow
router.get("/getpostuserifollow", fetchuser, async (req, res) => {
  let { page, size } = req.query;
  if (!page) {
    page = 1;
  }
  if (!size) {
    size = 3;
  }
  const limit = parseInt(size);
  const skip = (page - 1) * size;
  const userid = req.user.id;
  const id = await User.findById(userid);
  const totalpost = await Post.find({
    user: { $in: id.following },
  }).countDocuments();
  const userpost = await Post.find({ user: { $in: id.following } })
    .limit(limit)
    .skip(skip).sort({"_id": -1})
  res.json({userpost: userpost, page, totalpost });
});
//////////////////// like//////////////////
router.put("/like", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;

    let sucess;

    const post = req.header("postid");
    const existlikes = await Post.findById(post);
    const likecheck = existlikes.likes.includes(id);

    if (likecheck == true) {
      sucess = false;
      return res.status(400).json({ sucess });
    }
    if (!id) {
      return res.status(400).json({ error: "not allowed" });
    }
    const data = await Post.findByIdAndUpdate(
      post,
      {
        $push: { likes: id },
      },
      {
        new: true,
      }
    );

    sucess = true;
    res.json({ sucess, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

///////////////// unlike ///////////////////
router.put("/unlike", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(400).json({ error: "not allowed" });
    }
    const postid = req.header("postid");
    const data = await Post.findByIdAndUpdate(
      postid,
      {
        $pull: { likes: id },
      },
      {
        new: true,
      }
    );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const newnote = {};
    const { title, image } = req.body;
    if (title) {
      newnote.title = title;
    }

    if (image) {
      newnote.image = image;
    }
    let note = await Post.findById(req.params.id);
    note = await Post.findByIdAndDelete(
      req.params.id,
      { $set: newnote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    let note = await Post.findById(req.params.id);
    note = await Post.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = router;
