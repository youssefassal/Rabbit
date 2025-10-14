const express = require("express");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware.js");

const router = express.Router();

// @route  POST /api/users/register
// @desc   Register user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Registeration logic here
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    // Create JWT Payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in the response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route  POST /api/users/login
// @desc   Authenticate user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT Payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in the response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route  GET /api/users/profile
// @desc   Get logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
