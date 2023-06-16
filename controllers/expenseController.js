const Expense = require('../models/expenseModel');

exports.create = async (req,res,next) => {
    try{
        const user = req.user;
        console.log(user);
        const { title, description, cost } = req.body;
        if(!title || !cost){
            res.status(404).json({
                status:'Failed',
                message:'Title/Cost cannot be left empty'
            })
        }
        const expense = await Expense.create({
            title,
            description,
            cost,
            user: user._id
        })
        await user.expenses.push(expense);
        await user.save({validateBeforeSave: false});
        res.status(404).json({
            status:'Success',
            message:'Expense created',
            data: expense
        })
    }
    catch(err){
        res.status(404).json({
            status:'Failed',
            message:'Unable to create expense'
        })
    }
}

exports.get = async (req,res,next) => {
    try{
        const expense = await Expense.findById(req.params.id);
        if(!expense){
            res.status(404).json({
                status:'Failed',
                message:'No expense details found'
            })
        }
        res.status(404).json({
            status:'Success',
            data: expense
        })
    }
    catch(err){
        res.status(404).json({
            status:'Failed',
            message:'Unable to get expense details'
        })
    }
}

exports.destroy = async (req,res,next) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(404).json({
            status:'Success',
            message: 'Expense Deleted!'
        })
    }
    catch(err){
        res.status(404).json({
            status:'Failed',
            message:'Unable to delete expense'
        })
    }
}

exports.update = async (req,res,next) => {
    try{
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if(!expense){
            res.status(404).json({
                status:'Success',
                message: "Expense couldn't be updated"
            })
        }
        res.status(404).json({
            status:'Success',
            message: 'Expense updated!'
        })
    }
    catch(err){
        res.status(404).json({
            status:'Failed',
            message:'Unable to update expense'
        })
    }
}