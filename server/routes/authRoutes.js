const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const axios = require("axios");
const User = require("../models/User"); // your Mongoose model

const JWT_SECRET = "your_jwt_secret"; // replace with env var

router.post("/", async (req, res) => {
  console.log("inside google auth");
  const { token } = req.body;

  try {
    // Verify token with Google
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
    );
    const { email, name, sub: googleId } = googleRes.data;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user
      user = new User({
        username: name,
        email,
        googleId,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token: jwtToken,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    console.error("Google auth failed:", err.message);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
