const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validations");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Emial and password can't be edited from here.");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfuly`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

profileRouter.patch("/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    loggedInUser.password = await bcrypt.hash(req.body.password, 10);
    await loggedInUser.save();
    res.send(
      `${loggedInUser.firstName}, your password has been updated successfully`,
    );
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = profileRouter;
