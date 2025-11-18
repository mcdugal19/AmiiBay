import jwt from "jsonwebtoken";
import { User } from "../db/models/index.js";
import { Request, Response, NextFunction } from "express";

// Middleware that uses jwt to verify a valid token from the cookie.
const authRequired = async (req: any, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token;
  try {
    const { id }: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (id) {
      req.user = await User.getUserById(id);
      next();
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Failed to log in",
    });
    return;
  }
};

// Middleware that uses jwt to verify a valid token as well as checking if the user is a admin.
const adminRequired = async (req: any, res: Response, next: NextFunction) => {
  const token = req.signedCookies.token;
  try {
    const user: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (user.isAdmin) {
      req.user = await User.getUserById(user.id);
      next();
    }
  } catch (error) {
    res.status(401).send({
      message: "Requires admin account",
    });
    return;
  }
};

export { authRequired, adminRequired };
