import Profile from '../Models/Profile.js';

export const GetUserData = async(req,res) => {
    try{
        const {allData,getDataForDifferentUser} = req.query ;
        const {Email} = req ;
       
        if(!Email){
            return res.status(409).json({
                success:false,
                message:'Email Id is required'
            })
        }

        let userData ;
        // Getting profile Data for the different user
        if(getDataForDifferentUser){
            if(allData) userData = await Profile.findOne({UserName:getDataForDifferentUser.toLowerCase()}).select('-Password -__v -_id')
                .populate('Post');
            else userData = await Profile.findOne({UserName:getDataForDifferentUser.toLowerCase()})
                .select('-Password -__v -_id -Post -Followers -Following');
        }else{
            if(allData) userData = await Profile.findOne({Email:Email.toLowerCase()}).select('-Password -__v -_id').populate('Post');
            else userData = await Profile.findOne({Email:Email.toLowerCase()}).select('-Password -__v -_id -Post -Followers -Following');    
        }
        
       
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