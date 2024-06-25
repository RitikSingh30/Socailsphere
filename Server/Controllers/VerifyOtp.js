const Otp = require('../Models/OTP'); 

exports.VerifyOtp = async function (req, res) {
  try {
    const { Email, Otp: userOtp } = req.body;

    let otpDocument = await Otp.findOne({ Email }).sort({ 'OTP.createdAt': -1 }).select({ OTP: { $slice: -1 } });

    if (otpDocument) {
      otpDocument = otpDocument.OTP[0].code;
    }

    if (!otpDocument || otpDocument !== userOtp) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Otp',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Otp verified successfully',
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};