const mongoose = require("mongoose");

// Creating Schema for Work Experience
const workSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validate: [
        {
          validator: function (v) {
            return v instanceof Date && !isNaN(v);
          },
          message: (props) => `${props.value} is not a valid date!`,
        },
        {
          validator: async function (startDate) {
            const checkStartDate = await this.constructor.findOne({
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              _id: { $ne: this._id },
            });
            return !checkStartDate;
          },
          message:
            "Cannot add! You are already working at a different company at this time.",
        },
      ],
    },
    endDate: {
      type: mongoose.Schema.Types.Mixed, // allows Date or String
      validate: [
        {
          validator: function (v) {
            return v === "present" || (v instanceof Date && !isNaN(v));
          },
          message: (props) => `${props.value} is not a valid date!`,
        },
        {
          validator: function (endDate) {
            return endDate === "present" || this.startDate <= endDate;
          },
          message: "End date cannot be before the start date!",
        },
      ],
    },
    position: {
      type: String,
      required: true,
    },
    skillUsed: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const workExperience = mongoose.model("workExperience", workSchema);
module.exports = workExperience;
