const jwt = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../Controllers/userInfoController");

// Verfity the logged in Token
exports.verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt;

  // If access token not found
  if (!token)
    return res.status(401).json({ error: "Access denied! No Token Provided" });

  // If access Token Found then try further implementation
  try {
    jwt.verify(token, generatedtoken.accessToken, (err, decoded) => {
      if (err) {
        return res.status(500).json({ error: "Failed to authenticate token" });
      }
      req.userId = decoded.userId; // Add the decoded userId to the request
      next();
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
