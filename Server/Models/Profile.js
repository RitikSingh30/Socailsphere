import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

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
    SavePost:[
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

ProfileSchema.index({UserName:1});
            
export default mongoose.model('Profile', ProfileSchema);