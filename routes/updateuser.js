const express = require("express");
const fetchuser = require("../middlewares/fetchuser");
const User = require("../model/userSchema");
const Post = require("../model/postSchmea");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
router.put("/updateuser", fetchuser, async (req, res) => {
  // desctructor name dex, and image from reqest.body
  try {
    const id = req.user.id;
    const { name, username, image, password } = req.body;
    const newNote = {};
    // check if req.name exist then it will equal to NewNote  other wise  it will blank
    if (name) {
      newNote.name = name;
    }
    const user = await User.findOne({ username: username });
    if (user) {
      return res.json({
        sucess: true,
        error: " sorry a user with this username is alredy exist",
      });
    }
    if (username) {
      newNote.username = username;
    }
    if (image) {
      newNote.image = image;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(password, salt);
      newNote.password = secpassword;
    }
    if (password && password.length < 5) {
      return res.json("passoword should contain atlest 5 character");
    }
    // finding notes by its id if notes exists we user here params method if id exis in url then it will continue
    let userupdate = await User.findById(id);

    if (!userupdate) {
      return res.status(401).send("not found");
    }
    // comparing req.user.id to userupdate.user

    // update userupdates here
    userupdate = await User.findByIdAndUpdate(
      id,
      { $set: newNote },
      { new: true }
    ).select("-password");
    res.json({ usersucess: true, userupdate });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "not found" });
  }
});
module.exports = router;
