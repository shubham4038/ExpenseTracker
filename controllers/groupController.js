const Group = require('../models/groupModel');
const User = require('../models/userModel');

exports.addMembers = async (req,res,next)=>{
    const user = req.user;
    let removedMember=[];
    let filteredMembers = [];
    let {groupName,groupMember,groupExpense} = req.body;
    // Validation of Email id From our user model
    await Promise.all(groupMember.map(async (el,index)=>{
        const matchEmail = await User.findOne({email:el.email})
        if(matchEmail){
            filteredMembers.push(matchEmail)
        }else{
            removedMember.push(el.email)
        }      
    }))
    groupMember=filteredMembers;
    const groupdetails = await Group.create({groupName,groupMember,groupExpense});
    res.status(200).json({
        status:"Success",
        message: "Group Added",
        data: groupdetails,
        message:`${removedMember.join(" , ")} doesn't exist in the application` 
    })

    // Code Refactoring by removing extra await
    user.groupDetails.push(groupdetails);
    user.save({validateBeforeSave: false})
    await Promise.all([groupdetails.adminuser.push(user._id),groupdetails.save({validateBeforeSave: false})])
}

exports.calculateExpense = async (req,res,next)=>{
    // const user = req.user --> Getting the user deatils from middle ware but not helpful in this case.
    const groupExpensedetails = await Group.findById(req.params.id);
    const expenseEach = (groupExpensedetails.groupExpense) / (groupExpensedetails.groupMember.length);
    const updatePromises = groupExpensedetails.groupMember.map(async (el) => {
        const user = await User.findOne({ email: el.email });
        user.expenseonYou = expenseEach;
        await user.save();
      });
    
      await Promise.all(updatePromises)
    return res.status(200).json({
        status:"Success",
        data:{
            expenseEach
        },
        message : `Every Person needs to pay ${expenseEach}`
    })
    
}

exports.checkExpense = async (req,res,next)=>{
    const user = req.user;
    console.log(user)
}
exports.updateExpense = async (req,res,next)=>{
    const groupExpensedetails = await Group.findById(req.params.id);

}

