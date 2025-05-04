import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { supabase } from "../db.js";

const SALT = Number(process.env.SALT) || 10;
const JWT_KEY = process.env.JWT_KEY;

//  SIGN UP
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, cycleData } = req.body;

  console.log("Received signup data:", req.body); // Log all received data

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please provide all fields." });
  }

  try {
    console.log("Hashing password for user:", email);
    const hashedPassword = await bcrypt.hash(password, SALT);
    console.log("Hashed password:", hashedPassword); // Log the hashed password (be cautious in production)

    // Inserting into Supabase
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password: hashedPassword,
          cycle_data: cycleData || null,
        },
      ])
      .select();

    console.log("Supabase response:", { data, error }); // Log Supabase response

    if (error) {
      console.error("Supabase Error:", error);
      return res
        .status(500)
        .json({ error: error.message || "Failed to register user" });
    }

    res.json({ message: "User registered successfully", user: data[0] });
  } catch (err) {
    console.error("Error during signup:", err); // Log specific error
    res.status(500).json({ error: "Registration failed" });
  }
});

//  LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", req.body); // Log the received login data

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email and password." });
  }

  try {
    console.log("Checking if user exists with email:", email);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    console.log("Supabase user search result:", { user, error }); // Log user data and error

    if (error || !user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    console.log("Verifying password for user:", email);
    const verified = await bcrypt.compare(password, user.password);
    console.log("Password verification result:", verified); // Log password verification result

    if (!verified) {
      console.log("Incorrect password for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_KEY, {
      expiresIn: 60 * 60 * 24, // 24 hours
    });
    console.log("JWT token generated:", token); // Log the JWT token

    return res.json({ message: "User verified", token, user });
  } catch (err) {
    console.error("Error during login:", err); // Log specific error
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET profile
router.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
