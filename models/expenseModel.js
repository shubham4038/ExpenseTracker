const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description: {
        type: String,
        minlength: 10
    },
    cost:{
        type: Number,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Expense = mongoose.model('Expense',expenseSchema);

module.exports = Expense;