const mongoose = require("mongoose");

// Creating Schema for Project Work
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    require: true,
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
    require: true,
  },
  projectType: {
    type: String,
    require: true,
  },
  resourceUsed: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  projectLink: {
    type: String,
    require: true,
  },
});

const projectWork = mongoose.model("projectWork", projectSchema);
module.exports = projectWork;
