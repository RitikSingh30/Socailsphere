import { cloudinaryUpload } from "../../Utiles/Cloudinary.js";
import Profile from "../../Models/Profile.js";

export const updateUserProfileInfo = async(req,res) => {
    let fileUrl = null ;
    try{
        const {Email} = req ;

        if(!Email){
            return res.status(409).json({
                success:false,
                message:'Profile not updated'
            })
        }

        const {Bio,Gender,FullName,File} = req.body ;

        let update = {};

        if(Bio) update.Bio = Bio ;
        if(Gender) update.Gender = Gender ;
        if(FullName) update.FullName = FullName ;

        if(File){
            fileUrl = await cloudinaryUpload(File);
            update.ProfilePicture = fileUrl.secure_url ; 
        }

        const updateUser = await Profile.findOneAndUpdate({Email},{$set:update},{new:true, upsert: true}).select('-Password -__v -_id');
        return res.status(200).json({
            success:true,
            userData:updateUser,
            message:'User profile updated'
        })
    }catch(error){
        console.log(error)

        // If any operation fails, delete the uploaded file from cloudinary 
        if(fileUrl && fileUrl.public_id){
            await cloudinaryDelete(fileUrl.public_id);
        }

        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}