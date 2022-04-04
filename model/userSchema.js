const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true },
    image: {
      type: String,
      require: true,
      default:
        "https://res.cloudinary.com/sourabhvaish/image/upload/v1648640535/24-248253_user-profile-default-image-png-clipart-png-download_zvgwds.png",
    },
    email: { type: String, require: true },
    password: { type: String, require: true },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
module.exports = User;
