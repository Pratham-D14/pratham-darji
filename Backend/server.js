const express = require("express");
const personalInfoDb = require("./Config/personalInfoDbConnection");
const cors = require("cors");

// Importing Routers
const userRoute = require("./Routers/userRouter");
const projectRoute = require("./Routers/projectRouter");
const workRoute = require("./Routers/workRouter");

// Intiallizing
let app = express();
app.use(express.json());
app.use(cors());
personalInfoDb();

// User Router
app.use("/api/users", userRoute);

// Project Router
app.use("/api/project", projectRoute);

// Work Experience Router
app.use("/api/workExperience", workRoute);

app.listen(8000);
