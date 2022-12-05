const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    taskListName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type:Boolean,
        default:true,
    },
    tasks: [{
        type:mongoose.Types.ObjectId,
        required: true,
        ref: 'tasks'
    }]
})

const TaskList = mongoose.model('taskList', TaskListSchema);

module.exports = TaskList;