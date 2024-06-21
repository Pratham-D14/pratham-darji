const express = require("express");
const projectSchema = require("../Models/proectSchema");

let app = express();
app.use(express.json());

exports.createProject = async (req, res) => {
  const {
    projectName,
    projectImage,
    projectType,
    resourceUsed,
    projectDescription,
    projectLink,
  } = req.body;

  try {
    const project = new projectSchema({
      projectName,
      projectImage,
      projectType,
      resourceUsed,
      projectDescription,
      projectLink,
    });

    await project.save();
    let id = project["_id"];
    res.status(200).json(`project added successFully at id: ${id}`);
  } catch (error) {
    if (error.errors.projectName) {
      return res.status(400).json(error.errors.projectName.message);
    }
    return res.status(400).json(error);
  }
};
