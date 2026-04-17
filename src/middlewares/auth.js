const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!!!");
    }

    const { _id } = jwt.verify(token, "secretPassword");
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User does not exist.");
    }

    req.user = user;
    next();
  } catch (err) {
    if (res.headersSent) return next(err);
    res.status(500).send(err.message);
  }
};

//checking github commands

module.exports = {
  userAuth,
};
