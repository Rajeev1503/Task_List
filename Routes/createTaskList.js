const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const { check, validationResult } = require("express-validator");
const { createTaskList, showAllTaskList, deleteTaskList, editTask, saveEditedTask } = require("../Controller/createTaskList-controller");

router.get("/createtasklist", showAllTaskList);

router.post(
  "/createtasklist",
  [check("taskListName", "Task List Name is required").isLength({ min: 1 })],
  [check("description", "Description is required").isLength({ min: 1 })],
  createTaskList
);

router.get('/createtasklist/:id/edit', editTask);

router.put('/createtasklist/:id', saveEditedTask);

router.delete('/createtasklist/:id', deleteTaskList);

module.exports = router;
