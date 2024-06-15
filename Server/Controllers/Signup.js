const Profile = require('../Models/Profile');

exports.signup = async function(req,res,next){
    try{
        const {MobileNumber,Email} = req.body ;

        if(!MobileNumber && !Email){
            return res.status(401).json({
                message:"Mobile No or Email Id is required",
                success:false,
            })
        }
        
        let isProfileExist ;
        if(MobileNumber) isProfileExist = await Profile.findOne({MobileNumber});
        else isProfileExist = await Profile.findOne({Email});

        // if exist 
        if(isProfileExist){
            return res.status(409).json({
                message:`Profile with this ${MobileNumber ? "Mobile Number" : "Email Id"} already exist`,
                success:false,
            })
        }

        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}