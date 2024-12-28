import Profile from '../Models/Profile.js';
import bcrypt from 'bcrypt-nodejs';
import Otp from '../Models/OTP.js';
import { SendOtp } from './SendOtp.js';

export const singupVerification = async function(req,res){
    try{
        const {Email,UserName} = req.body ;

        if(!Email){
            return res.status(401).json({
                message:"Email Id is required",
                success:false,
            })
        }
        
        let isProfileExist = await Profile.findOne({Email:Email.toLowerCase()});

        // if exist 
        if(isProfileExist){
            return res.status(409).json({
                message:"Profile with this Email Id already exist",
                success:false,
            })
        }

        if(!UserName){
            return res.status(401).json({
                message:'Username is required',
                success:false
            })
        }

        let isUserNameExist = await Profile.findOne({UserName:UserName.toLowerCase()});

        // if the username is taken by someone else 
        if(isUserNameExist){
            return res.status(409).json({
                message:"Username already taken",
                success:false,
            })
        }

        return await SendOtp(req,res);

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    } 
}



export const singup = async function(req,res){
    try{
        const {Email,FullName,Password,UserName,otp} = req.body;

        if(!Email || !FullName || !Password || !UserName || !otp){
            return res.status(401).json({
                success:false,
                message:"All Fields are required"
            })
        }

        // verify otp 
        let otpDocument = await Otp.findOne({ Email }).sort({ 'OTP.createdAt': -1 }).select({ OTP: { $slice: -1 } });

        if(otpDocument){
            otpDocument = otpDocument.OTP[0].code ;
        }
        
        if(!otpDocument || otpDocument !== otp){
            return res.status(401).json({
                success:false,
                message:'Invalid Otp'
            })
        }

        // Encrypting the password 
        const hashPassword = bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);
        const userDoc = new Profile({Email:Email.toLowerCase(),FullName,Password:hashPassword,UserName:UserName.toLowerCase()});
        await userDoc.save();

        // Creating JWT Token 
        const token = jwt.sign({Email: userDoc.Email}, process.env.JWT_SECRET_KEY, {
            expiresIn: '7d',
        })

        return res.status(200).json({
            success:true,
            message:'Signup Successfull, Welcome!!',
            token
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}