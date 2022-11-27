const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    periodType: {
        type:String,
        required:true
    },
    period: {
        type:String,
        required:true
    },
    taskListName: {
        type: mongoose.Types.ObjectId,
        ref: 'task'
    }
})

const Task = mongoose.model('taskList', taskSchema);

module.exports = Task;