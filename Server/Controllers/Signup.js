const Profile = require('../Models/Profile');
const bcrypt = require('bcrypt-nodejs');
const { SignupOtp } = require('../Helper/SignupOtp');
const Otp = require('../Models/OTP');
const { signupOtpTemplate } = require('../MailTemplate/signupOtpTemplate');
const { saveOtp } = require('../Helper/SaveOtp');
const otpGenerator = require('otp-generator');

exports.singupVerification = async function(req,res){
    try{
        const {Email} = req.body ;

        if(!Email){
            return res.status(401).json({
                message:"Email Id is required",
                success:false,
            })
        }
        
        let isProfileExist = await Profile.findOne({Email});

        // if exist 
        if(isProfileExist){
            return res.status(409).json({
                message:"Profile with this Email Id already exist",
                success:false,
            })
        }

        const OTP = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false ,lowerCaseAlphabets: false});

        const sendmail = await SignupOtp({to:Email,mailBody:signupOtpTemplate(OTP)});
        
        if(!sendmail){
            return res.status(401).json({
                success:false,
                message:'Otp send fail',
            })
        }

        const isOtpSave = await saveOtp({Email,otp:OTP});

        return res.status(200).json({
            success:true,
            message:'Otp send successfull',
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    } 
}



exports.singup = async function(req,res){
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
        const userDoc = new Profile({Email,FullName,Password:hashPassword,UserName});
        await userDoc.save();

        return res.status(200).json({
            success:true,
            message:'Signup Successfull, Welcome!!'
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}