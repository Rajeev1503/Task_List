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
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;