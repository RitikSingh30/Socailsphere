const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    content:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Comment',CommentSchema);