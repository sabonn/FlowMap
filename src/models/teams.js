const joi = require("joi");
const db = require("../config/db");

class team {
  // queries
  static getAllTeamsQuery = "SELECT * FROM teams";
  static getTeamByIdQuery = "SELECT * FROM teams WHERE id = $1";
  static createTeamQuery =
    "INSERT INTO teams (name,manager,members) VALUES ($1,$2,$3) RETURNING *";

  // team schema
  static getTeamByIdSchema = joi.object({
    id: joi.number().integer().min(1).required(),
  });

  static createTeamSchema = joi.object({
    name: joi.string().min(1).max(200).required(),
    manager: joi.number().integer().min(1).required(),
    members: joi.array().items(joi.number().integer().min(1)).min(1),
  });

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
