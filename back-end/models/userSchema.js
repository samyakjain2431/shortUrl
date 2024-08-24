const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required: true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
},
{timestamps: true})

userSchema.pre('save', async function(next){
    const person = this;
    //hash the password only when new record or just modify
    if(!person.isModified('password'))return next();
    try{
        //hash password generate
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
        
    }
})

userSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;