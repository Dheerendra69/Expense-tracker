const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const SignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const SaveUserController = async (req, res) => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      return res.status(400).json({ message: "Missing username or email" });
    }

    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({
        message: "User already exists",
        token,
        username: user.username,
        email: user.email,
      });
    }

    const newUser = new User({ username, email });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error in save-user route:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { LoginController, SignupController, SaveUserController };
