const mongoose = require("mongoose");

// Creating Schema for Project Work
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    validate: {
      validator: async function (projectName) {
        const checkProjectName = await this.constructor.findOne({
          projectName,
        });
        return !checkProjectName;
      },
      message: "Project Name is already in use",
    },
  },
  imageUrl: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    required: true,
  },
  resourceUsed: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectLink: {
    type: String,
    required: true,
  },
});

const projectWork = mongoose.model("projectWork", projectSchema);
module.exports = projectWork;
