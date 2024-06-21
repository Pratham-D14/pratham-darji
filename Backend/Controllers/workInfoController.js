const express = require("express");
const workSchema = require("../Models/workSchema");
const moment = require("moment");

let app = express();
app.use(express.json());

exports.addExperience = async (req, res) => {
  const { companyName, startDate, endDate, position, skillUsed } = req.body;

  const parsedStartDate = moment(startDate, "DD-MM-YYYY").toDate();
  const parsedEndDate =
    endDate && endDate !== "present"
      ? moment(endDate, "DD-MM-YYYY").toDate()
      : "present";

  try {
    const workExperience = new workSchema({
      companyName,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      position,
      skillUsed,
    });

    await workExperience.save();
    let id = workExperience["_id"];
    res.status(200).json(`work Experience added successFully at id: ${id}`);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
