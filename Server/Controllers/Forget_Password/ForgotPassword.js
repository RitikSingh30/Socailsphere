import Profile from '../../Models/Profile.js';
import { SendOtp } from '../SendOtp.js';

export const forgotPassword = async function (req, res) {
  try {
    const { Email } = req.body;
    if (!Email) {
      return res.status(400).json({
        message: 'Email Id is required',
        success: false,
      });
    }

    let isProfileExist = await Profile.findOne({ Email: Email.toLowerCase() });

    if (isProfileExist) {
      return await SendOtp(req, res); 
    
     
    } else {
      return res.status(404).json({
        message: 'Profile with this email does not exist',
        success: false,
      });
    }
  } catch (error) {
    console.error('Forgot password error: ', error);
    return res.status(500).json({
      message: 'An error occurred',
      success: false,
    });
  }
};
