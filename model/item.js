const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    periodType: {
        type: String,
    },
    periodDate: {
        type: Date,
        required: true
    },
    taskListName: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;