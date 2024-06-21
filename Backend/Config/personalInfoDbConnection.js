const mongoose = require("mongoose");
require("dotenv").config();

const personalInfoDb = async () => {
  try {
    await mongoose.connect(process.env.personalInfoDB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = personalInfoDb;
