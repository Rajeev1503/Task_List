const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    periodType: {
        type: String,
    },
    periodDate: {
        type: Date,
    },
    taskListName: {
        type: String,
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;