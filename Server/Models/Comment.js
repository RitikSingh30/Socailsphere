import mongoose from "mongoose";

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

export default mongoose.model('Comment',CommentSchema);