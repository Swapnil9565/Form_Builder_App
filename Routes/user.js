const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const userModel = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const genSalt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, genSalt);

  try {
    const userExist=await userModel.findOne({email});
    if(userExist){
      return res.status(400).json({message:"User already exist"})
    }
    await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.status(200).json({ message: "Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Incorrect Email or password" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Incorrect Email or password" });
    }
  
    const payload = {
      id: user._id,
    };
    const token = Jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({message:"Internal server Error"})
  }
 
});
module.exports = router;
