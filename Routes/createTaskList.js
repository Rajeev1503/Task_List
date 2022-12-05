const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const { check, validationResult } = require("express-validator");
const { createTaskList, showAllTaskList, deleteTaskList, saveEditedTask, taskListPage, getTaskList } = require("../Controller/createTaskList-controller");


router.param("taskListId",getTaskList);

router.get("/createtasklist", showAllTaskList);

router.post(
  "/createtasklist",
  [check("taskListName", "Task List Name is required").isLength({ min: 1 })],
  [check("description", "Description is required").isLength({ min: 1 })],
  createTaskList
  );

router.get('/createtasklist/:taskListId', taskListPage);

router.put('/createtasklist/:taskListId', saveEditedTask);

router.delete('/createtasklist/:taskListId', deleteTaskList);

module.exports = router;
