const mongoose = require('mongoose');

const Tasks_Schema = new mongoose.Schema({
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
        ref: 'task'
    }]
})

const TaskList = mongoose.model('taskList', Tasks_Schema);

module.exports = TaskList;