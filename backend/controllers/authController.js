
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ email, password: hashedPassword, username });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
