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
    console.log(error);
  }
});

export default router;
