const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const User_Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdTaskList: [{
    type:mongoose.Types.ObjectId,
    ref:'taskList',
  }]

});

User_Schema.methods = {
  authenticate : async function(enteredPassword){
    const verifyPassword = bcrypt.compare(enteredPassword, this.password);
    return verifyPassword;
  }
}

const User = mongoose.model("User", User_Schema);
module.exports = User;
