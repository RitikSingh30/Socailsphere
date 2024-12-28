import mongoose from 'mongoose';

const OTPItemSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 300 seconds (5 minutes)
  }
});

const OTPSchema = new mongoose.Schema({
    Email:{
        type:String,
        required:true,
        unique:true
    },
    OTP:[OTPItemSchema]
})

export default mongoose.model('Otp',OTPSchema);