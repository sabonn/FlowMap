const db = require("../config/db");
const joi = require("joi");

class task {
  // queries
  static getAllTasksQuery = "SELECT * FROM tasks";
  static getTaskByIdQuery = "SELECT * FROM tasks WHERE id = $1";
  static createTaskQuery =
    "INSERT INTO task (name,creator_id,members) VALUES ($1,$2,$3) RETURNING *";

  // task schema
  static getTaskByIdSchema = joi.object({
    id: joi.number().integer().min(1).required(),
  });
  static createTaskSchema = joi.object({
    name: joi.string().min(1).max(200).required(),
    creator_id: joi.number().integer().min(1).required(),
    members: joi.array().items(joi.number().integer().min(1)),
  });

  // table logic
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        creator_id INT NOT NULL,
        members INT[] DEFAULT '{}'
    )`;

    try {
      await db.queryDB(query);
      console.log("Tasks Table Is READY");
    } catch (err) {
      console.error("Error During Tasks Table CREATION: ", err);
      throw err;
    }
  }
}

module.exports = task;
