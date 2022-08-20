const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      min: 5,
      max: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 60,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
