const Profile = require('../Models/Profile')

exports.GetUserData = async(req,res) => {
    try{
        const {Email,allData} = req.query ;
       
        if(!Email){
            return res.status(409).json({
                success:false,
                message:'Email Id is required'
            })
        }

        let userData ;
        if(allData) userData = await Profile.findOne({Email:Email.toLowerCase()}).select('-Password -__v -_id');
        else userData = await Profile.findOne({Email:Email.toLowerCase()}).select('-Password -__v -_id -Post -Followers -Following');

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