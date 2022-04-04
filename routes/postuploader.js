const express = require("express");

const multer = require("multer");
const path = require("path");
const app = express();

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
});

router.post("/uploadpost", upload.single("post"), (req, res) => {
  console.log(req.file);
  res.json({
    sucess: 1,
    profile_url: `/images/${req.file.filename}`,
  });
});

module.exports = router;