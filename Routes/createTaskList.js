const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { createTaskList, showAllTaskList } = require("../Controller/createTaskList-controller");


router.get("/createtasklist", showAllTaskList);

router.post(
  "/createtasklist",
  [check("taskListName", "Task List Name is required").isLength({ min: 1 })],
  [check("description", "Description is required").isLength({ min: 1 })],
  createTaskList
);

module.exports = router;
