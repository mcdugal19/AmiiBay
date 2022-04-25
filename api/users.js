const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const { User } = require("../db/models");
const { authRequired, adminRequired } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    // const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.createUser({
      username,
      password,
      email,
    });

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
    const user = await User.getUser({ username, password });
    if (user) {
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1w" });
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send(user);
    } else {
      next({
        name: "Invalid username or password",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/logout", async (req, res, next) => {
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

usersRouter.get("/admin/:userId", adminRequired, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newAdmin = await User.updateUser({ id: userId, isAdmin: true });
    delete newAdmin.password;
    res.send({ newAdmin, message: "Successfully added new admin" });
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

usersRouter.get("/", adminRequired, async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete(
  "/admin/delete/:userId",
  adminRequired,
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      await User.deleteUser(userId);
      res.send({ message: "Successfully deleted user" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = usersRouter;
