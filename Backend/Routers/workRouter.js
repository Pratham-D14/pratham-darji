const express = require("express");
const router = express.Router();
const workController = require("../Controllers/workInfoController");

// Route for Register User
router.post("/addExperience", workController.addExperience);

module.exports = router;
