const Profile = require('../Models/Profile')

exports.GetUserData = async(req,res) => {
    try{
        const {Email} = req.query ;
        if(!Email){
            return res.status(409).json({
                success:false,
                message:'Email Id is required'
            })
        }

        const userData = await Profile.findOne({Email:Email.toLowerCase()}).select('-Password -__v -_id');

        if(!userData){
            return res.status(409).json({
                success:false,
                message:`User Doesn't Exist`
            })
        }

        return res.status(200).json({
            success:true,
            userData
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}