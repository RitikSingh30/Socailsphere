const Cloudinary = require("../../Utiles/Cloudinary");
const Profile = require("../../Models/Profile");

exports.updateUserProfileInfo = async(req,res) => {
    try{
        const {Email} = req.body ;

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
            const fileUrl = await Cloudinary(File);
            update.ProfilePicture = fileUrl ; 
        }

        const updateUser = await Profile.findOneAndUpdate({Email},{$set:update},{new:true, upsert: true}).select('-Password -__v -_id');
        return res.status(200).json({
            success:true,
            userData:updateUser,
            message:'User profile updated'
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Internal Server Error'
        })
    }
}