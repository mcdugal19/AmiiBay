const jwt = require("jsonwebtoken");
const { getUserById } = require("../db/models/user");

const authRequired = async (req, res, next) => {
  const token = req.signedCookies.token;
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    if (id) {
      req.user = await getUserById(id);
      next();
    } else {
      next(error);
    }
  } catch (error) {
    res.status(401).send({
      loggedIn: false,
      message: "Failed to log in",
    });
    return;
  }
  next();
};

module.exports = { authRequired };
