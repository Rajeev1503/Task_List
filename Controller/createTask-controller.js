const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");
const Task = require("../model/Task");

exports.getTask = (req, res, next, id) => {
  Task.findById(id).exec((err, task) => {
    if (err || !task) {
      return res.status(404);
    }
    req.Task = task;
    next();
  });
};

exports.createNewTask = async (req, res) => {
  const currTaskList = await TaskList.findById(req.TaskList._id);
  const { taskName, description, periodType, dueDate } = req.body;
  const newTask = new Task({
    taskName,
    description,
    periodType,
    dueDate,
    isActive: true,
    taskList: req.TaskList._id,
  });
  await currTaskList.tasks.push(newTask);
  await newTask.save();
  await currTaskList.save((err) => {
    if (err) {
      return res
        .status(400)
        .redirect(`/createtasklist/${req.TaskList._id}`);
    }
    res.status(200).redirect(`/createtasklist/${req.TaskList._id}`);
  });
};

exports.updateTask = (req, res) => {
  const isActive = req.query.isactive;
  Task.updateOne(
    { _id: req.Task._id },
    { $set: { isActive: isActive } },
    (err) => {
      if (err) {
        res.status(400).redirect(`/createtasklist/${req.TaskList._id}`);
      }
      res.status(200).redirect(`/createtasklist/${req.TaskList._id}`);
    }
  );
};

exports.deleteTask = async (req, res) => {
    Task.findByIdAndDelete(req.Task._id).exec((err)=>{
      if(err){
        return res.status(400).redirect(`/createtasklist/${req.TaskList._id}`);
      }
      res.status(200).redirect(`/createtasklist/${req.TaskList._id}`);
    });
  };
