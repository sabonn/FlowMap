const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

pool
  .connect()
  .then(() => console.log("Connected To FlowMap DataBase"))
  .catch((err) =>
    console.error("Faild To Connect To Flow Map DataBase\nError:", err),
  );

const queryDB = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    return result.rows;
  } catch (err) {
    console.log("Error in query in data base:", err);
    throw err;
  }
};

module.exports = {
  queryDB,
};
