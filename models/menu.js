const mongoose = require('mongoose')
const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        required: true
    },
    in_Drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []

    },
    num_sales: {
        type: String,
        default: 0,
    },

})

const menu = mongoose.model('menu', MenuSchema)
module.exports = menu