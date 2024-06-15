exports.signup = function(req,res){
    const {mobileNo,emailId,userName,password} = req.body ;

    if(!mobileNo && !emailId){
        return res.status(401).json({
            message:"Mobile No or Email Id is required",
            success:false,
        })
    }

    if(!userName || !password){
        return res.status(401).json({
            message:"All fields are required",
            success:false,
        })
    }

    if(mobileNo){
        // checking whether duplicat entry exists or not

        // if exist 
    }
    else{
        
    }
}