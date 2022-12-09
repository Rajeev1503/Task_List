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
        ref: 'tasks'
    }],
    teammembers: [{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }],
    creator: [{
        type:mongoose.Types.ObjectId,
        ref:'User',
    }]
})

const TaskList = mongoose.model('taskList', TaskListSchema);

module.exports = TaskList;