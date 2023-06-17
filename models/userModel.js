const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: [validator.isEmail,'Please provide a valid email']
    },
    password: {
        type: String,
        require: true,
        minlength: [8,'Minimum length should be 8'],
        maxlength: [16,'Maximum length should be 16'],
        select: false
    },
    passwordConfirm: {
        type: String,
        require: true,
        min: [8,'Minimum length should be 8'],
        max: [16,'Maximum length should be 16'],
        validate: {
            validator: function(el){
                return el=this.password
            }
        }
    },
    expenses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense'
    }],
    groupDetails :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
},{timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.verifyPassword = function(userPassword, savedPassword){
    return bcrypt.compare(userPassword,savedPassword);
}

const User = mongoose.model('User',userSchema);

module.exports = User;