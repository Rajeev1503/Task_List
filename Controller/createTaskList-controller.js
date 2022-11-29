const { check, validationResult } = require("express-validator");

//required schemas
const TaskList = require("../model/TaskList");

exports.showAllTaskList = async (req, res) => {
  const allTaskList = await TaskList.find({});
  if (!allTaskList) {
    res.status(404).json({
      error: "Task not Found",
    });
  }

  res.render("index", { allTaskList });
};

exports.createTaskList = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).redirect("/createTaskList");
  }

  const newTaskList = new TaskList(req.body);
  newTaskList.save((err) => {
    if (err) {
      return res.status(400).redirect("/createTaskList");
    }

    res.status(200).redirect("/createTaskList");
  });

  // next();
};

// const checkForActive = ()=>{

// }

exports.editTask = async (req, res) => {
  const { id } = req.params;
  const editTask = await TaskList.findById(id);
  res.render("edit", { editTask });
};

exports.saveEditedTask = async (req, res) => {
  const { id } = req.params;
  const editedTask = await TaskList.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect('/createtasklist');
};



exports.deleteTaskList = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await TaskList.findByIdAndDelete(id);
    res.status(200).redirect("/createTaskList");
  } catch (err) {
    return res.status(400).redirect("/createTaskList");
  }
};
