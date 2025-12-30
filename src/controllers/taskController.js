const db = require("../config/db.js");
const task = require("../models/tasks.js");
const { _, handleError } = require("../routes/routes.js");

class taskController {
  static async getAllItems(req, res) {
    try {
      const result = await db.queryDB(task.getAllTasksQuery);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Task Found",
        });
      }
      res.status(200).json({
        success: true,
        count: result.length,
        data: result,
      });
    } catch (err) {
      handleError(res, err, "getAllTasks");
    }
  }

  static async getTaskById(req, res) {
    try {
      const id = parseInt(req.query.id);
      const result = await db.queryDB(task.getTaskByIdQuery, [id]);
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Task Found",
        });
      }
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err) {
      handleError(res, err, "getTaskById");
    }
  }

  static async createTask(req, res) {
    try {
      const { name, creator_id, members } = req.body;
      const result = await db.queryDB(task.createTaskQuery, [
        name,
        creator_id,
        members,
      ]);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (err) {
      handleError(res, err, "createTask");
    }
  }
}
