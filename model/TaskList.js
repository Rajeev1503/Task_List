const mongoose = require('mongoose');

const Tasks_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        required:true
    },
    period: {
        type:String,
        required:true
    }
})

const TaskList = mongoose.model('Task_Schema', Tasks_Schema);

module.exports = TaskList;