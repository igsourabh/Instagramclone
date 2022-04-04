const mongoose = require("mongoose");

const otpSchema = mongoose.Schema(
  {
    email: { type: String, require: true },
    otp: { type: Number, require: true },
    expirein: { type: Number, require: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("otp", otpSchema);
