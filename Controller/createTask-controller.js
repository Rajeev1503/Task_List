const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");
const Task = require("../model/Task");

// exports.showAllTasks = async (req, res) => {
//   const allTasks = await Task.find({});
//   if (!allTasks) {
//     res.status(404).json({
//       error: "Task not Found",
//     });
//   }

//   res.render("tasks", { allTasks });
// };

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
        .redirect(`/api/createtasklist/${req.TaskList._id}`);
    }
    res.status(200).redirect(`/api/createtasklist/${req.TaskList._id}`);
  });
};

// exports.taskListPage = async (req, res) => {
//   const { id } = req.params;
//   const getTaskList = await TaskList.findById(id);
//   res.render("tasklist", { getTaskList });
// };

// exports.editTask = async (req, res) => {
//   const { id } = req.params;
//   const editTask = await TaskList.findById(id);
//   res.render("edit", { editTask });
// };

// exports.saveEditedTask = async (req, res) => {
//   const { id } = req.params;
//   const editedTask = await TaskList.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//   res.redirect('/createtasklist');
// };

// exports.deleteTaskList = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedTask = await TaskList.findByIdAndDelete(id);
//     res.status(200).redirect("/createTaskList");
//   } catch (err) {
//     return res.status(400).redirect("/createTaskList");
//   }
// };
