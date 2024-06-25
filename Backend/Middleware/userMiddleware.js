// Creating Middleware to check user authentication
userMiddleware = (req, res, next) => {
  console.log("Checking user Authentication");
  next();
};

module.exports = userMiddleware;
