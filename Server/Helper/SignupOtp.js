const { sendMail } = require("../Utiles/MailSender")

exports.SignupOtp = async({to,mailBody}) => {
    const subject = "Sign up OTP";
    const params = {to,subject,mailBody};
    
    const response = await sendMail(params);
    return response ; 
}