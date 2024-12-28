import { sendMail } from "../Utiles/MailSender.js";

export const SignupOtp = async({to,mailBody}) => {
    const subject = "Sign up OTP";
    const params = {to,subject,mailBody};
    
    const response = await sendMail(params);
    return response ; 
}