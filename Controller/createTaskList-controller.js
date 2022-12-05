const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");
const Task = require("../model/Task");

exports.getTaskList = (req, res, next, id) => {
  TaskList.findById(id).exec((err,taskList)=> {
    if(err || !taskList) {
      return res.status(404);
    }
    req.TaskList = taskList;
    next();
  });
}

exports.showAllTaskList = async (req, res) => {
  const allTaskList = await TaskList.find({});
  if (!allTaskList) {
    res.status(404).json({
      error: "Task not Found",
    });
  }

  res.render("index", { allTaskList });
};

exports.createTaskList = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).redirect("/api/createTaskList");
  }

  const newTaskList = new TaskList(req.body);
  newTaskList.save((err) => {
    if (err) {
      return res.status(400).redirect("/api/createTaskList");
    }

    res.status(200).redirect("/api/createTaskList");
  });

};


exports.taskListPage = async (req,res) => {
  const taskList = await TaskList.findById(req.TaskList._id)
    if(!taskList) {
      return res.status(404);
    }
  const allTasks = await Task.find({taskList:req.TaskList._id});
    if(!allTasks) {
      return res.status(404);
    }
    res.status(200).render("tasklist", { taskList, allTasks});

};

exports.saveEditedTask = async (req, res) => {
  const editedTask = await TaskList.findByIdAndUpdate(req.TaskList._id, req.body, { runValidators: true, new: true });
  res.redirect(`/api/createtasklist/${req.TaskList._id}`);
};

exports.deleteTaskList = async (req, res) => {
  try {
    const deletedTask = await TaskList.findByIdAndDelete(req.TaskList._id);
    res.status(200).redirect("/api/createTaskList");
  } catch (err) {
    return res.status(400).redirect("/api/createTaskList");
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
