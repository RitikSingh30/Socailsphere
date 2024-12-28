import otpGenerator from 'otp-generator';
import { SignupOtp } from '../Helper/SignupOtp.js';
import { signupOtpTemplate } from '../MailTemplate/signupOtpTemplate.js';
import { saveOtp } from '../Helper/SaveOtp.js';

export const SendOtp = async function(req,res){
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