const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/models/user");

const authRequired = async (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (id) {
      req.user = await getUserById(id);
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

const adminRequired = async (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (user.isAdmin) {
      req.user = await getUserById(user.id);
      next();
    }
  } catch (error) {
    res.status(401).send({
      message: "Requires admin account",
    });
    return;
  }
};

module.exports = { authRequired, adminRequired };
