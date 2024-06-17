const Profile = require('../Models/Profile');
const bcrypt = require('bcrypt-nodejs');
const otpGenerator = require('otp-generator');
const { SignupOtp } = require('../MailTemplate/SignupOtp');
const Otp = require('../Models/OTP');

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

        const sendmail = await SignupOtp({to:Email,OTP});

        if(!sendmail){
            return res.status(401).json({
                success:false,
                message:'Otp send fail',
            })
        }

        const newOtp = new Otp({Email,OTP});
        await newOtp.save();

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
        const {Email,FullName,Password,UserName} = req.body;

        if(!Email || !FullName || !Password || !UserName){
            return res.status(401).json({
                success:false,
                message:"All Fields are required"
            })
        }

        const hashPassword = bcrypt.hashSync(Password, bcrypt.genSaltSync(8), null);

        // Encrypting the password 
        return res.status(200).json({
            success:true
        });
    }catch(error){

    }
}