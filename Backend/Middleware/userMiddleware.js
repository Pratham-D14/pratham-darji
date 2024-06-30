const mongoose = require("mongoose");
const userSchema = require("../Models/userSchema");

// Creating Middleware to check user authentication
userMiddleware = async (req, res, next) => {
  console.log("middleware connected");
  let { username, password } = req.body;

  let user = await userSchema.findOne({ username });

  if (user.password == password) {
    console.log("User Authenticated Successfully");
    next();
  } else {
    res.status(400).send("Please enter valid credential");
  }
};

module.exports = userMiddleware;
