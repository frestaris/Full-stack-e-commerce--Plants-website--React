import express from "express";
import User from "./user.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).send({ message: "Error registering user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(404).send({ message: "Password not match" });
    }
    res.status(200).send({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logged in user", error);
    res.status(500).send({ message: "Error logged in user" });
  }
});

export default router;
