const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const { authRequired, adminRequired } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const _user = await User.getUserByUsername(username);
    const _userEmail = await User.getUserByEmail(email);

    if (!email.includes("@")) {
      throw {
        name: "ValidEmailError",
        message: "Not a valid email address, try again :/",
      };
    }
    if (_user) {
      throw {
        name: "UserExistsError",
        message: "Username is taken, try again :/",
      };
    }
    if (password.length < 8) {
      throw {
        name: "PasswordTooShort",
        message: "Password is too short, try again :/",
      };
    }
    if (_userEmail) {
      throw {
        name: "EmailExistsError",
        message: "Email already in use, try again :/",
      };
    }

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
    res.send({ user, message: `Welcome to Amiibos, ${user.username}!` });
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
      res.send({ message: `Welcome back, ${user.username}!`, user });
    } else {
      next({
        name: "UsernamePasswordError",
        message: "Invalid username or password",
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
      message: "Come back soon!",
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

usersRouter.patch("/me", authRequired, async (req, res, next) => {
  try {
    const { id, username, password, email } = req.body;
    const _user = await User.getUserByUsername(username);
    const _userEmail = await User.getUserByEmail(email);
    const updateUser = { id: id };
    if (username) {
      if (_user) {
        throw {
          name: "UserExistsError",
          message: "Username is taken, try again",
        };
      } else {
        updateUser.username = username;
      }
    }
    if (password) {
      if (password.length < 8) {
        throw {
          name: "PasswordLengthError",
          message: "Password is too short!",
        };
      } else {
        updateUser.password = password;
      }
    }
    if (email) {
      if (!email.includes("@")) {
        throw {
          name: "ValidEmailError",
          message: "Not a valid email",
        };
      } else if (_userEmail) {
        throw {
          name: "EmailExistsError",
          message: "Email already in use",
        };
      } else {
        updateUser.email = email;
      }
    }
    const updatedUser = await User.updateUser(updateUser);
    delete updatedUser.password;
    res.send({ updatedUser, message: "Successfully updated user" });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
