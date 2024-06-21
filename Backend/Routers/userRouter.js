const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userInfoController");

// Route for Register User
router.post("/resgister", userController.registerUser);

module.exports = router;
