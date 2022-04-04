const express = require("express");
const mongoose = require("mongoose");
const fetchuser = require("../middlewares/fetchuser");
const Post = require("../model/postSchmea");
const router = express.Router();
const Comment = require("../model/commentSchema");

router.put("/comment/:id", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    const postid = req.params.id;
    const commentcreate = await new Comment({
      comment: req.body.comment,
      commentby: req.body.commentby,
      commentid: req.body.commentid,
      userid: id,
      postid: postid,
    });

    commentcreate.save();

    res.json({ commentcreate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.delete("/uncomment/:commentid", fetchuser, async (req, res) => {
  try {
    const id = req.user.id;
    const findcomment = await Comment.findOneAndDelete({
      commentid: req.params.commentid,
    });

    if (findcomment.userid.toString() != id) {
      return res.json("not allowed");
    }

    res.json(findcomment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// update comment
router.put("/updatecomment/:id", fetchuser, async (req, res) => {
  try {
    const id = req.params.id;
    const { comment, commentby } = req.body;

    const newcomment = {};
    if (comment) {
      newcomment.comment = comment;
    }
    if (commentby) {
      newcomment.commentby = commentby;
    }

    let updatecomment = await Comment.findById(id);

    if (updatecomment.userid.toString() != id) {
      return res.json("not allowed");
    }

    updatecomment = await Comment.findByIdAndUpdate(
      id,

      { $set: newcomment },
      { new: true }
    );

    res.json({ updatecomment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error" });
  }
});

router.get("/getallcomment/:id", fetchuser, async (req, res) => {
  try {
    const id = req.params.id;
    const findcomment = await Comment.find({ postid: id });
    res.json(findcomment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal server error" });
  }
});

module.exports = router;
