import Post from '../Models/Post.js';
import Profile from '../Models/Profile.js';
import mongoose from 'mongoose';
import { cloudinaryDelete, cloudinaryUpload } from '../Utiles/Cloudinary.js';

export const CreateNewPost = async(req,res) => {
    // Implementing transcation
    const session = await mongoose.startSession();
    session.startTransaction();

    let cloudinaryResult = null ;

    try{
        const {caption,url,type} = req.body ;
        const {Email} = req ;

        if(!url || !caption || !type || !Email){
            return res.status(409).json({
                success:false,
                message:'Post creation fail try again'
            })
        }

        // saving Image or Video to cloudinary 
        cloudinaryResult = await cloudinaryUpload(url);
        const fileUrl = cloudinaryResult.secure_url ;

        // // saving post to database
        const userPost = new Post({Url:fileUrl,Caption:caption,Type:type});
        await userPost.save({session});

        // Finding the user by email and updating their Post array
        const userProfile = await Profile.findOneAndUpdate(
            {Email:Email},
            {$push: {Post : userPost._id}},
            {new: true, session}
        );

        if(!userProfile){

            // // If any operation fails, delete the uploaded file from cloudinary 
            await cloudinaryDelete(cloudinaryResult.public_id);

            // Abort the transaction
            await session.abortTransaction();
            session.endSession();
            
            return res.status(404).json({
                success:false,
                message:'User not found please login and try again'
            })
        }

        // Commit the transaction 
        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success:true,
            message:'Post created successfully'
        })
    }catch(error){
        console.log(error);

        // If any operation fails, delete the uploaded file from cloudinary 
        if(cloudinaryResult && cloudinaryResult.public_id){
            await cloudinaryDelete(cloudinaryResult.public_id);
        }
        // Abort the transaction
        await session.abortTransaction();
        session.endSession();

        return res.status(500).json({
            success:false,
            message: "Post creation fail try again"
        })
    }
}