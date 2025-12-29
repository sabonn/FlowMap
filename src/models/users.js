const db = require("../config/db");

class user {
  // queries
  static getAllUsersQuery = "SELECT * FROM users";
  static getUserByIdQuery = "SELECT * FROM users WHERE id = $1";
  static createUserQuery =
    "INSERT INTO users (id,name,password,email) VALUES ($1,$2,$3,$4) RETURNING *";

  // table logic
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL
    )`;

    try {
      await db.queryDB(query);
      console.log("Users Table Is READY");
    } catch (err) {
      console.error("Error During Users Table CREATION: ", err);
      throw err;
    }
  }
}

module.exports = user;
