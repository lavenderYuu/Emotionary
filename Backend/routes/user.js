import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { Entry } from "../models/entry.model.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); 

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
      return res.status(401).json({ message: "Invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// https://developers.google.com/identity/sign-in/web/backend-auth#node.js

// Creates new or fetches existing Google user
// POST /users/google-auth
router.post("/google-auth", async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ message: "No ID token" });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const name = payload["name"].split(" ")[0];
        const email = payload["email"];
        const googleId = payload["sub"];

        let user = await User.findOne({ email: email });

        if (!user) {
            user = new User({
                name: name,
                email: email,
                googleId: googleId,
            });
            await user.save();
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Google ID token verification failed:", error);
        res.status(401).json({ message: "Invalid Google ID token" });
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
        const entries = await Entry
          .find({ user_id: req.params.userId })
          .populate('tags') // get tags
          .sort({ date: -1 }) // always return sorted in descending order
          .exec();
          res.json(entries);
    } catch (err) {
        console.error("Error fetching entries:", err);
        res.status(400).json({ error: 'Failed to fetch entries' });
    }
});

export default router;
