const db = require("../config/db");

class team {
  // queries
  static getAllTeamsQuery = "SELECT * FROM teams";
  static getTeamByIdQuery = "SELECT * FROM teams WHERE id = $1";
  static createTeamQuery =
    "INSERT INTO teams (id,name,manager,members) VALUES ($1,$2,$3,$4) RETURNING *";

  // table logic
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        manager INT NOT NULL,
        members INT[] DEFAULT '{}'
    )`;

    try {
      await db.queryDB(query);
      console.log("Teams Table Is READY");
    } catch (err) {
      console.error("Error During Teams Table CREATION: ", err);
      throw err;
    }
  }
}

module.exports = team;
