import Otp from '../Models/OTP.js';

export const saveOtp = async function({Email,otp}){
    try{

        let existingOtpDoc = await Otp.findOne({Email});

        // if document already exist 
        if(existingOtpDoc){
            existingOtpDoc.OTP.push({ code: otp });
            await existingOtpDoc.save();
        }else{
            const newOtpDoc = new Otp({
                Email,
                OTP: [{ code: otp }]
              });
              await newOtpDoc.save();
        }

        return true ;

    }catch(error){
        console.log(error);
        return false ;
    }
}