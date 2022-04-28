const express = require("express");
const reviewsRouter = express.Router();
const { Reviews } = require("../db");
const { authRequired, adminRequired } = require("./utils");

module.exports = reviewsRouter;
