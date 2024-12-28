import Profile from '../Models/Profile.js';
import Comment from '../Models/Comment.js';

export const getPostToDisplayAtHomePage = async(req,res) => {
    try{
        const {Email} = req;
        const getPostData = await Profile.findOne({Email}).populate({
            path:'Post',
            populate: [
                {
                    path:'Like',
                    model:'Profile'
                },
                {
                    path:'Comment',
                    model:'Comment'
                }
            ]
        }).populate({
            path:'Following',
            select: '-FullName -Email -Password -Bio -SavePost -Followers -Gender',
            populate:{
                path:'Post',
                populate:[
                    {
                        path:'Like',
                        model:'Profile',
                    },
                    {
                        path:'Comment',
                        model:'Comment'
                    }
                ]
            }
        }).select('-FullName -Email -Password -Bio -SavePost -Followers -Gender');

        const structuredPostData = [] ;
        
        // Collecting all the post of the current user which have login in
        for(const post of getPostData.Post){
            let currentUserPostDataAlongWithUserInfo = {userName:getPostData?.UserName, ProfilePicture:getPostData?.ProfilePicture};
            currentUserPostDataAlongWithUserInfo.Url = post.Url ;
            currentUserPostDataAlongWithUserInfo.Caption = post.Caption ;
            currentUserPostDataAlongWithUserInfo.Type = post.Type ;
            currentUserPostDataAlongWithUserInfo.Like = post.Like ;
            currentUserPostDataAlongWithUserInfo.Comment = post.Comment ;
            
            currentUserPostDataAlongWithUserInfo.Id = structuredPostData.length + 1 ;
            structuredPostData.push(currentUserPostDataAlongWithUserInfo);
        }

        // Collecting all the post of the current user friends
        for(const following of getPostData.Following){
            let userFriendPostDataAlongWithUserInfo = {} ;
            userFriendPostDataAlongWithUserInfo.UserName = following.UserName ;
            userFriendPostDataAlongWithUserInfo.ProfilePicture = following.ProfilePicture ;

            // iterating on the post field of the following
            for(const post of following.Post){
                userFriendPostDataAlongWithUserInfo.Url = post.Url ;
                userFriendPostDataAlongWithUserInfo.Caption = post.Caption ;
                userFriendPostDataAlongWithUserInfo.Type = post.Type ;
                userFriendPostDataAlongWithUserInfo.Like = post.Like ;
                userFriendPostDataAlongWithUserInfo.Comment = post.Comment ;
            }
            
            userFriendPostDataAlongWithUserInfo.Id = structuredPostData.length + 1 ;
            structuredPostData.push(userFriendPostDataAlongWithUserInfo);
        
        }

        return res.status(200).json({
            success:true,
            postData:structuredPostData
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}