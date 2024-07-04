const mongoose = require('mongoose');
require('dotenv').config() ;

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
    Bio:{
        type:String,
    },
    Post:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }
    ],
    Followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile'
        },
    ],
    Following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile'
        }
    ],
    ProfilePicture:{
        type:String,
        default:process.env.SERVER_URL + '/Images/defaultprofilepic.png'
    },
    Gender:{
        type:String,
        enum:["Male","Female"]
    }

})
            
module.exports = mongoose.model('Profile',ProfileSchema);