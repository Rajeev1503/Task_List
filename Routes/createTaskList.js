const express = require("express");
const router = express.Router();
const methodOverride = require('method-override');
const { check, validationResult } = require("express-validator");
const { createTaskList, showAllTaskList, deleteTaskList, saveEditedTask, taskListPage, getTaskList, getTeamMember, addTeamMember, deleteTeamMember } = require("../Controller/createTaskList-controller");
const { isAuthenticated } = require("../Middleware/auth-middleware");


router.param("taskListId",getTaskList);
router.param("memberUsername",getTeamMember);

router.get('/',isAuthenticated,showAllTaskList);

router.post(
  "/createtasklist",
  [check("taskListName", "Task List Name is required").isLength({ min: 1 })],
  [check("description", "Description is required").isLength({ min: 1 })], isAuthenticated, createTaskList
  );
  
  router.post('/createtasklist/:taskListId/addteammember',isAuthenticated, addTeamMember);
  
  router.get('/createtasklist/:taskListId/deletemember/:memberUsername',isAuthenticated, deleteTeamMember);
  
  router.get('/createtasklist/:taskListId',isAuthenticated, taskListPage);
  
  router.put('/createtasklist/:taskListId',isAuthenticated, saveEditedTask);
  
  router.delete('/createtasklist/:taskListId',isAuthenticated, deleteTaskList);
  
  module.exports = router;