const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    groupName:{
        type : String,
        require:[true,'Please Enter Group name']
    },
    groupMember : [
        {
            name:{
                type:String,
                require:true,
            },
            email:{
                type:String,
                require:true,
            }
        }
    ],
    groupExpense : {
        type:Number,
        require:true
    },
    adminuser:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
    ]

})

const Group = new mongoose.model('Group',groupSchema);

module.exports = Group;



// groupMember : [
//     {
//         type:String,
//         name:String,
//         email:{
//             type:String,

//         }
//     }
// ]
