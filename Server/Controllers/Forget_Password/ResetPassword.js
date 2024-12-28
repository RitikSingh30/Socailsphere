import Profile from "../../Models/Profile.js";
import bcrypt from 'bcrypt-nodejs';

export const ResetPassword = async(req,res) => {
    try{
        const {Email,Password,confirmPassword} = req.body; 

        if(Password !== confirmPassword){
            return res.status(409).json({
                success:false,
                message:'Password and confirm password should be same',
            })
        }

        const user = await Profile.findOne({ Email: Email.toLowerCase() });

        if(!user){
            return res.status(409).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        // hashing the password 
        const hashPassword = bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
        user.Password = hashPassword ;
        await user.save();

        return res.status(200).json({
            success:true,
            message:'Password changed successfull',
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:'Password Changed Failed'
        })
    }
}