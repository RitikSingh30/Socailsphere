import Profile from "../Models/Profile.js";

export const searchUsers = async(req,res) => {
    try{
        const {searchUserName} = req.query ;
        const {Email} = req ;
        
        if(!searchUserName){
            return res.status(400).json({
                success:false,
                message:'Invalid name try again'
            })
        }

        // Fetching all the user which include searchUserName in their username
        const allUserWithSearchName = await Profile.find({
            UserName: {$regex: searchUserName , $options : "i"},
            Email: { $ne: Email}
        }).select("UserName ProfilePicture");                 

        return res.status(200).json({
            success:true,
            allUserWithSearchName
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Internal server error try again'
        })
    }
}