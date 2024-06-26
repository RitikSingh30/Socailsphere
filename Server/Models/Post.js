const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    ImgUrl:{
        type:String,
        required:true,
    },
    Caption:{
        type:String,
        required:true,
    },
    Like:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Profile'
        }
    ],
    Comment:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ], 
})

module.exports = mongoose.model('Post',PostSchema);