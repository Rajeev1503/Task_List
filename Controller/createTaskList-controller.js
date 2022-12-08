const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");
const Task = require("../model/Task");
const User = require("../model/User");

exports.getTaskList = (req, res, next, id) => {
  TaskList.findById(id).exec((err, taskList) => {
    if (err || !taskList) {
      return res.status(404);
    }
    req.TaskList = taskList;
    next();
  });
};

exports.showAllTaskList = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).redirect("/auth");
  }
  const allTaskList = await TaskList.find({ creator: user._id });
  if (!allTaskList) {
    return res.status(404);
  }
  res.status(200).render("index", { allTaskList });
};

exports.createTaskList = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).redirect("/");
  }

  const currUser = await User.findById(req.user._id);
  const { taskListName, description } = req.body;

  const newTaskList = new TaskList({
    taskListName,
    description,
    creator: currUser._id,
  });
  await currUser.createdTaskList.push(newTaskList);
  newTaskList.save((err) => {
    if (err) {
      console.log("saving error : " + err);
    }
  });
  currUser.save((err) => {
    if (err) {
      return res.status(400).redirect("/");
    }

    res.status(200).redirect("/");
  });
};

exports.taskListPage = async (req, res) => {
  const taskList = await TaskList.findById(req.TaskList._id);
  if (!taskList) {
    return res.status(404);
  }
  const allTasks = await Task.find({ taskList: req.TaskList._id });
  if (!allTasks) {
    return res.status(404);
  }
  res.status(200).render("tasklist", { taskList, allTasks });
};

exports.saveEditedTask = async (req, res) => {
  const editedTask = await TaskList.findByIdAndUpdate(
    req.TaskList._id,
    req.body,
    { runValidators: true, new: true }
  );
  res.redirect(`/createtasklist/${req.TaskList._id}`);
};

exports.deleteTaskList = async (req, res) => {
  try {
    const deletetasks = await Task.deleteMany({ taskList: req.TaskList._id });
    const deletedTaskList = await TaskList.findByIdAndDelete(req.TaskList._id);
    res.status(200).redirect("/");
  } catch (err) {
    return res.status(400).redirect("/");
  }
};

// exports.showAllTasks = async (req,res) => {
//   const taskList = await TaskList.findById(req.TaskList._id)
//     if(err || !taskList) {
//       return res.status(404);
//     }
//   const allTasks = await Task.find({tasklist:req.TaskList._id});
//     if(!allTasks) {
//       return res.status(404);
//     }
//     allTasks.populate('taskList');
//     res.status(200).render("tasklist", { taskList }, {allTasks});

// };
