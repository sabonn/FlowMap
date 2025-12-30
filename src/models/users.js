const db = require("../config/db");
const joi = require("joi");

class user {
  // queries
  static getAllUsersQuery = "SELECT * FROM users";
  static getUserByIdQuery = "SELECT * FROM users WHERE id = $1";
  static getUserByNameQuery = "SELECT * FROM users WHERE name = $1";
  static createUserQuery =
    "INSERT INTO users (name,password,email) VALUES ($1,$2,$3) RETURNING *";

  // user schema
  static createUserSchema = joi.object({
    name: joi.string().min(1).max(200).required(),
    password: joi.string().min(8).max(200).required(),
    email: joi.string().min(6).required(),
  });

  static getUserByIdSchema = joi.object({
    id: joi.number().integer().min(1).required(),
  });

  static getUserByNameSchema = joi.object({
    name: joi.string.min(1).max(200).required(),
  });

  // table logic
  static async initTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        name PRIMARY KEY VARCHAR(200) NOT NULL,
        id SERIAL,
        password VARCHAR(200) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE
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
