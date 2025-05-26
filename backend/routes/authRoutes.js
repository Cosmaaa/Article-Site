import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already in use" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id.toString(), name: newUser.name },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(201).json({
    message: "User created successfully",
    token,
    user: { _id: newUser._id, name: newUser.name, email: newUser.email },
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid email or password" });

  const token = jwt.sign(
    { userId: user._id.toString(), name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
  res.json({
    message: "Login successful",
    token,
    user: { _id: user._id, name: user.name, email: user.email },
  });
});

router.get("/me", authenticateToken, async (req, res) => {
  
  res.json({ user: { _id: req.user.userId, name: req.user.name } });
});

export default router;
