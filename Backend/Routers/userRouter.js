const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userInfoController");

// defining Middleware
const userMiddleware = require("../Middleware/userMiddleware");
const jwtMiddleware = require("../Middleware/jwtMiddleware");

// Route for Register new User
router.post("/register", userController.registerUser);

// Route for Login
router.post("/login", userMiddleware.userMiddleware, userController.loginUser);

// Route to get Logged in user info
router.get("/userInfo", jwtMiddleware.verifyToken, userController.getUserInfo);

module.exports = router;
