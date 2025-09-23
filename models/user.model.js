const mongoose = require('mongoose');
const { isLowercase } = require('validator');

const userSchema = new mongoose.Schema({
    username:{ 
        type:String,
        unique:true,
        required:true,
        trim:true,
        Lowercase:true,
        minlength:3
    },
    email:{ 
        type:String,
        unique:true,
        required:true,
        trim:true,
        Lowercase:true,
        minlength:13
    },
    password:{ 
        type:String,
        unique:true,
        required:true,
        trim:true,
        minlength:3
    }
});

const user = mongoose.model('user',userSchema)

module.exports = user;