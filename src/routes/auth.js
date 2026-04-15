const express = require("express");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { userAuth } = require("../middlewares/auth");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, about, age } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
      about,
    });
    const token = jwt.sign({ _id: user._id }, "secretPassword");
    res.cookie("token", token);
    await user.save();
    res.json({
      message: `User created successfully ${user.firstName}`,
      data: user,
    });
  } catch (err) {
    res.status(500).send("Error creating user" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email ID invalid");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, "secretPassword");
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Incorrect password");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("LOGOUT successfully!!");
});

module.exports = { authRouter };
