const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    image: { type: String, require: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],

    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdby: { type: String, require: true },
    userimage: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", PostSchema);
