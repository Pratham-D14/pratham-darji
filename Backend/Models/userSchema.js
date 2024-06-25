const mongoose = require("mongoose");

// Creating Schema for User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: async function (email) {
          const checkEmail = await this.constructor.findOne({ email });
          return !checkEmail;
        },
        message: "Email is already Registered",
      },
    },
    phone: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (username) {
          const checkUsername = await this.constructor.findOne({ username });
          return !checkUsername;
        },
        message: "Username is already taken",
      },
    },
    password: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

let User = mongoose.model("User", userSchema);
module.exports = User;
