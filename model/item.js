const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    list: {
        type: String,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;