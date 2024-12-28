import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const MAIL_SETTING = {
    service: 'gmail',
    auth:{
        user:process.env.MAIL_EMAIL,
        pass:process.env.MAIL_PASSWORD
    },
}

const transporter = nodemailer.createTransport(MAIL_SETTING);

export const sendMail = async(params) => {
    try{
        let info = await transporter.sendMail({
            from:MAIL_SETTING.auth.user,
            to:params.to,
            subject:params.subject,
            html:params.mailBody,
        });
        return info ;
    }catch(error){
        console.log(error);
        return false ;
    }
}