const mongoose = require("mongoose");

// Creating Schema for User
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
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
      require: true,
    },
    username: {
      type: String,
      require: true,
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
      require: true,
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
