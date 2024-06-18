const otpGenerator = require('otp-generator');
const { SignupOtp } = require('../Helper/SignupOtp');
const { signupOtpTemplate } = require('../MailTemplate/signupOtpTemplate');
const { saveOtp } = require('../Helper/SaveOtp');

exports.SendOtp = async function(req,res){
    try{
        const {Email} = req.body ;
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
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
}