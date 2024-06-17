const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    FullName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },

})

module.exports = mongoose.model('Profile',ProfileSchema);