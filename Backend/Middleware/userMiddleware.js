const userSchema = require("../Models/userSchema");
const bcrypt = require("bcrypt");

// Creating Middleware to check user authentication
exports.userMiddleware = async (req, res, next) => {
  console.log("usermiddleware connected");
  let { username, password } = req.body;

  try {
    let user = await userSchema.findOne({ username });

    if (!user) {
      return res.status(401).json({
        error: "Authentication failed! Please enter valid username",
      });
    }
    console.log("Username Matched Successfully");

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Authentication failed! Please enter valid password",
      });
    }
    console.log("password Matched Successfully");

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Login Failed" });
  }
};
