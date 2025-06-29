import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Entry } from "../models/entry.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format. Example: user@example.com",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Logs user out, handled client-side
// POST /users/logout
router.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

// Get all entries of a user
// GET /users/:userId/entries
router.get('/:userId/entries', async (req, res) => {
    try {
        const entries = await Entry.find({ user_id: req.params.userId }).sort({ date: -1 }); // always return sorted in descending order
        res.json(entries);
    } catch (err) {
        console.error("Error fetching entries:", err);
        res.status(400).json({ error: 'Failed to fetch entries' });
    }
});


export default router;
