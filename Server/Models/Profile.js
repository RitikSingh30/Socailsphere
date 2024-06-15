const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Profile',ProfileSchema);