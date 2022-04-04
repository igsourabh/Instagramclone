const mongoose = require("mongoose");

const CommentSchmea = mongoose.Schema(
  {
    comment: { type: String, require: true },
    commentid: { type: String, require: true },
    commentby: { type: String, require: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    postid: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("comment", CommentSchmea);
module.exports = User;
