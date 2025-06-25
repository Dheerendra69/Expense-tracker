const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided" });
  }

  try {
    const verified = jwt.verify(token, "secret"); // Use .env ideally
    req.user = verified; // Contains userId, email, etc.
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
