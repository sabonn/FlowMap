const dotenv = require("dotenv");
const { spawnSync, spawn } = require("child_process");

dotenv.config();

const PG_BIN = "/opt/homebrew/opt/postgresql@14/bin/pg_ctl";
const PG_DATA = process.env.PG_DATA;
const PG_PORT = process.env.PG_PORT;

let startedByScript = false;

// Check PostgreSQL status
const status = spawnSync(PG_BIN, ["-D", PG_DATA, "status"], { stdio: "pipe" });

if (status.status === 0) {
  console.log("PostgreSQL is already running.");
} else {
  console.log("Starting PostgreSQL...");
  const pgProcess = spawn(
    PG_BIN,
    [
      "-D",
      PG_DATA,
      "-o",
      `"-p ${PG_PORT}"`,
      "-l",
      `${PG_DATA}/logfile`,
      "start",
    ],
    { stdio: "inherit" },
  );

  // Wait a few seconds for the server to start
  const waitTime = 2000; // ms
  const start = Date.now();
  while (Date.now() - start < waitTime) {} // simple wait

  startedByScript = true;
}

// Start your backend server (server.js in the same directory)
console.log("Starting Node.js server...");
const serverProcess = spawn("node", ["./src/server.js"], { stdio: "inherit" });

//  Stop PostgreSQL on exit (only if we started it)
function stopPG() {
  if (startedByScript) {
    console.log("Stopping PostgreSQL...");
    spawnSync(PG_BIN, ["-D", PG_DATA, "stop"], { stdio: "inherit" });
  }
  process.exit(0);
}

process.on("SIGINT", stopPG);
process.on("exit", stopPG);
