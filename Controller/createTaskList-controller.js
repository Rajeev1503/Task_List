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
exports.getTeamMember = (req, res, next, id) => {
  User.findOne({ username: id }).exec((err, teamMember) => {
    if (err || !teamMember) {
      return res.status(404);
    }
    req.teamMember = teamMember;
    next();
  });
};

exports.showAllTaskList = async (req, res) => {
  if (!req.user) {
    return res.status(404).redirect("/auth");
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).redirect("/auth");
  }
  const allTaskList = await TaskList.find({ creator: user._id });
  if (!allTaskList) {
    return res.status(404);
  }
  const allTeamTaskList = await TaskList.find({ teammembers: user._id });
  if (!allTeamTaskList) {
    return res.status(404);
  }
  res.status(200).render("createtasklist", { allTaskList, allTeamTaskList });
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

exports.addTeamMember = async (req, res) => {
  if (req.TaskList.creator.toString()!==req.user._id.toString()) {
    return res.redirect('/');
  }
  else {
  const { teammemberusername } = req.body;
  const teamMember = await User.findOne({ username: teammemberusername });
  if (!teamMember) {
    return res.status(404).redirect("/");
  }
  const taskList = await TaskList.findById(req.TaskList._id);
  if (!taskList) {
    return res.status(404).redirect("/");
  }
  await taskList.teammembers.push(teamMember);
  await teamMember.ongoingprojects.push(taskList);
  teamMember.save((err) => {
    if (err) {
      console.log("saving error : " + err);
    }
  });
  taskList.save((err) => {
    if (err) {
      return res.status(400).redirect("/");
    }
  });

  return res.status(200).redirect(`/createtasklist/${req.TaskList._id}`);
}
};

exports.deleteTeamMember = async (req, res) => {
  if (req.TaskList.creator.toString()!==req.user._id.toString()) {
    return res.redirect('/');
  }
  else {
  const teamMember = await User.findById(req.teamMember._id);
  if (!teamMember) {
    return res.status(404).redirect("/");
  }
  const taskList = await TaskList.findById(req.TaskList._id);
  if (!taskList) {
    return res.status(404).redirect("/");
  }
  await taskList.teammembers.pull(teamMember);
  await teamMember.ongoingprojects.pull(taskList);
  teamMember.save((err) => {
    if (err) {
      console.log("saving error : " + err);
    }
  });
  taskList.save((err) => {
    if (err) {
      return res.status(400).redirect("/");
    }
  });

  return res.status(200).redirect(`/createtasklist/${req.TaskList._id}`);
}
};

exports.taskListPage = async (req, res) => {
  let isCreator = true;
  const taskList = await TaskList.findById(req.TaskList._id);
  if (!taskList) {
    return res.status(404);
  }

  const allTasks = await Task.find({ taskList: req.TaskList._id });
  if (!allTasks) {
    return res.status(404);
  }

  const teamMembers = await User.find({ ongoingprojects: req.TaskList._id });
  if (!teamMembers) {
    return res.status(404);
  }
  if (req.TaskList.creator.toString()!==req.user._id.toString()) {
    isCreator = false;
  }
  return res.status(200).render("tasklist", { taskList, allTasks, teamMembers, isCreator});
};

exports.saveEditedTask = async (req, res) => {
  if (req.TaskList.creator.toString()!==req.user._id.toString()) {
    return res.redirect('/');
  }
  else {
  const editedTask = await TaskList.findByIdAndUpdate(
    req.TaskList._id,
    req.body,
    { runValidators: true, new: true }
  );
  return res.redirect(`/createtasklist/${req.TaskList._id}`);
}
};

exports.deleteTaskList = async (req, res) => {
  if (req.TaskList.creator.toString()!==req.user._id.toString()) {
    return res.redirect('/');
  }
  else {
      const deletetasks = await Task.deleteMany({ taskList: req.TaskList._id });
      const deletedTaskList = await TaskList.findByIdAndDelete(req.TaskList._id);
      res.status(200).redirect("/");
  }
};
