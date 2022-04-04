const express = require("express");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");
const secret = process.env.JWT_SECRET;

const Otp = require("../model/otpSchema");
const dotenv = require("dotenv");
dotenv.config();

router.post("/createuser", async (req, res) => {
  try {
    let sucess;
    let usernameavailable;
    const { name, email, password, username, image } = req.body;
    if (!name || !email || !password || !username) {
      res.send("please fill all the feilds");
    }
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      sucess = false;
      return res.json({
        sucess,
        emailexist: true,
        error: "user with this email is already exist",
      });
    }
    const findusername = await User.findOne({ username: username });
    if (findusername) {
      usernameavailable = false;
      return res.json({
        usernameavailable,
        usernameexist: true,
        error: "this username is not available",
      });
    }
    if (name.length < 3) {
      return res.status(400).json("name should conttain 3 characters");
    }
    if (password.length < 5) {
      return res.status(400).json("password should conttain 5 characters");
    }
    const salt = await bcrypt.genSalt(10);
    const secpassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      username: username,
      email: email,
      password: secpassword,
    });

    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, secret);
    sucess = true;

    res.json({ sucess, authtoken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server serror" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let sucess;
    if (!email || !password) {
      return res.json({ error: "please fill all the feilds" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      sucess = false;
      return res.json({ sucess, error: "please eneter correct creadentials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password);
    if (!passwordcompare) {
      sucess = false;

      return res.json({ sucess, error: "please eneter correct creadentials" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const userid = user.id;
    const authtoken = jwt.sign(data, secret);
    sucess = true;
    res.json({ sucess, userid, authtoken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server serror" });
  }
});

// get my details

router.get("/getmydetails", fetchuser, async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id).select("-password");

  res.json(user);
});

router.get("/getalluserbyid", async (req, res) => {
  try {
    const userid = req.header("userid");
    if (!userid) {
      return res.status(400).json({ error: "not found" });
    }
    const users = await User.findById(userid)
      .select("-password")
      .select("-email");
    res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.get("/getfollowinguser", async (req, res) => {
  const userid = req.body;

  const myuser = await User.find(userid).select("-password");

  res.status(200).json(myuser);
  console.log(myuser);
});

// get user by name search querry is recomended
router.get("/getalluserbyname", async (req, res) => {
  try {
    const name = req.header("name");
    if (!name) {
      return res.json({ error: "not found" });
    }

    const users = await User.find({ name })
      .select("-password")
      .select("-email");
    res.send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.get("/searchuser", fetchuser, async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user.id } });
  res.send(users);
});

router.post("/change-password", async (req, res) => {
  // use mailer nodejs module

    const { email } = req.body;
    const { expirein } = req.body;
    const { otp } = req.body;
    const data = await Otp.findOne({
      email: email,
      expirein: expirein,
      otp: otp,
    });
    // const response = {};
    if (!data) {
      return res.json({ status: 500, error: "otp wrong" });
    }

    if (data) {
      let currenttime = new Date().getTime();
      const diff = data.expirein - currenttime;
      if (diff < 0) {
        return res.json({ status: 402, error: "time expire" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const user = await User.findOne({ email: email });
        const hash = await bcrypt.hash(req.body.password, salt);
        user.password = hash;
        user.save();
        res.json({ sucess: "sucessfully updated" });
        console.log(data.expirein);
      }
    }
 
});
module.exports = router;
