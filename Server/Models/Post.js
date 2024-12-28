import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    Url:{
        type:String,
        required:true,
    },
    Caption:{
        type:String,
    },
    Type:{
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

export default mongoose.model('Post',PostSchema);