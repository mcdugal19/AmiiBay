const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { User } = require("../db/models");
const { authRequired } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.createUser({ username, password: hashedPassword, email });

    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1w" });

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({ user });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = User.getUserByUsername(username);
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      const token = req.signedCookies.token;
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send({ user });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      loggedIn: false,
      message: "Successfully Logged Out",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/me", authRequired, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
