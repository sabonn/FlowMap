const express = require("express");
const router = express.Router();
const tasks = require("../models/tasks.js");
const teams = require("../models/teams.js");
const users = require("../models/users.js");

const handleError = (res, err, origin = "") => {
  console.error(`Error in ${origin}:`, err);
  res.status(500).json({
    success: false,
    message: "Server Error",
  });
};

module.exports = { router, handleError };
