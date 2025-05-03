import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../model/User.js";
import tokenValidation from "../middlewares/tokenValidation.js";

const SALT = Number(process.env.SALT);
const JWT_KEY = process.env.JWT_KEY;

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, cycleData } = req.body;
    const newUser = new User({
      email,
      password: bcrypt.hashSync(password, SALT),
    });
    await newUser.save();
    res.send(`new user ${req.body.email} created`);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received:", { email, password });

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Unknown email");
      return res.status(401).json({ message: "Unknown email" });
    }

    // Verify password
    const verified = await bcrypt.compare(password, user.password);
    console.log("Password verification result:", verified);

    if (!verified) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Sign token
    const token = jwt.sign({ userId: user._id }, JWT_KEY, {
      expiresIn: 60 * 60 * 24,
    });
    console.log("Token generated:", token);

    // Send response
    return res.json({ message: "user verified", token, user });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).send({ message: "Internal server error" });
  }
});
