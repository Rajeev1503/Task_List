const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  createNewTask,
  updateTask,
  getTask,
  deleteTask,
} = require("../Controller/createTask-controller");
const { getTaskList } = require("../Controller/createTaskList-controller");

router.param("taskListId", getTaskList);
router.param("taskId", getTask);

router.post("/createtasklist/:taskListId/task", createNewTask);
router.get("/createtask/:taskListId/:taskId", updateTask);
router.get("/createtask/:taskListId/:taskId/delete", deleteTask);

module.exports = router;
