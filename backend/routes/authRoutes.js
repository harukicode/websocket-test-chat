const express = require("express");
const router = express.Router();
const User = require("../models/User.js");

//Registration
router.post("/register"),
  async (req, res) => {
    try {
      const { username, password } = req.body;

      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this name already exists" });
      }

      const user = await User.create(username, password);
      res
        .status(200)
        .json({
          message: "The user is successfully registered",
          userID: user.id,
        });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error user registration" });
    }
  };

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Incorrect user name or password" });
    }

    const isValid = await User.verifyPassword(user, password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Incorrect user name or password" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    res.json({
      message: "Login is successfully",
      user: { id: user.id, username: user.username },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erorr user login" });
  }
});

//Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout error" });
    }
    res.json({ message: "Logout successfully" });
  });
});

module.exports = router;
