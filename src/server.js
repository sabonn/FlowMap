const express = require("express");
const dotenv = require("dotenv");
const task = require("./models/tasks.js");
const team = require("./models/teams.js");
const user = require("./models/users.js");

//loading environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialise DB tables
(async () => {
  try {
    await task.initTable();
    await team.initTable();
    await user.initTable();
  } catch (err) {
    console.error("Failed in tables creation\nError:", err);
    process.exit(1);
  }
})();

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
