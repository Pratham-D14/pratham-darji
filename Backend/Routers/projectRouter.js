const express = require("express");
const router = express.Router();
const projectController = require("../Controllers/projectInfoController");

router.post("/addProject", projectController.createProject);

module.exports = router;
