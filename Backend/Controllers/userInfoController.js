const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = require("../Models/userSchema");
const userMiddleware = require("../Middleware/userMiddleware");

let app = express();
app.use(express.json());

// Generate access token secret
const ACCESS_TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

// Generate refresh token secret
const REFRESH_TOKEN_SECRET = crypto.randomBytes(64).toString("hex");

exports.registerUser = async (req, res) => {
  const { name, email, phone, username, password, role } = req.body;

  try {
    const register = new userSchema({
      name,
      email,
      phone,
      username,
      password,
      role,
    });

    await register.save();
    let id = register["_id"];
    res.status(200).json(`User added at id: ${id}`);
  } catch (error) {
    if (error.errors.email) {
      return res
        .status(400)
        .send("Email already registered try with different email");
    }

    if (error.errors.username) {
      return res.status(400).send("Username is already taken");
    }
    res.status(400).send(error);
  }
};

// app.use(userMiddleware);

exports.loginUser = async (req, res, userMiddleware) => {
  const { username, password } = req.body;
  try {
    const user = await userSchema.findOne({ username, password });
    res.status(200).send("User Logged in Successfully");
  } catch (error) {
    res.send(error);
    // console.log(error);
  }
};
