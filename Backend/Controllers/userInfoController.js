const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = require("../Models/userSchema");
const bcrypt = require("bcrypt");

let app = express();
app.use(express.json());

// Generate access token secret
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

// Generate refresh token secret
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// Contrller to Register User
exports.registerUser = async (req, res) => {
  const { name, email, phone, username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const register = new userSchema({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
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

// Controller to Login USer
exports.loginUser = async (req, res) => {
  //userMiddleware check user already register or not
  const { username } = req.body;
  try {
    const user = await userSchema.findOne({ username });
    const token = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production
      maxAge: 3600000, // 1 hour
      path: "/",
      expires: new Date(Date.now() + 3600000), // 1 hour from now
    });

    res.status(200).send("User Logged in Successfully");
  } catch (error) {
    res.status(400).send(error);
  }
};

// Controller to provide logged in user information
exports.getUserInfo = async (req, res) => {
  console.log("This api will give you user Information");
};

// Export access and refresh token secrets
module.exports.ACCESS_TOKEN_SECRET = ACCESS_TOKEN_SECRET;
module.exports.REFRESH_TOKEN_SECRET = REFRESH_TOKEN_SECRET;
