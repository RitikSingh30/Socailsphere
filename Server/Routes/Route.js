import { Router } from 'express';
import { singupVerification, singup } from '../Controllers/Signup.js';
import { SendOtp } from '../Controllers/SendOtp.js';
import { loginVerification } from '../Controllers/Login.js';
import { forgotPassword } from '../Controllers/Forget_Password/ForgotPassword.js';
import { VerifyOtp } from '../Controllers/VerifyOtp.js';
import { ResetPassword } from '../Controllers/Forget_Password/ResetPassword.js';
import { GetUserData } from '../Controllers/GetUserData.js';
import { updateUserProfileInfo } from '../Controllers/UpdateUserProfile/UpdataUserProfileInfo.js';
import { CreateNewPost } from '../Controllers/CreateNewPost.js';
import { VerifyToken } from '../Controllers/VerifyToken.js';
import { searchUsers } from '../Controllers/searchUser.js';
import { getPostToDisplayAtHomePage } from '../Controllers/GetPostToDisplayAtHomePage.js';

const route = Router();

route.post('/signupVerification',singupVerification);
route.post('/signup',singup);
route.post('/sendOtp',SendOtp);
route.post('/login',loginVerification);
route.post('/forgotPassword',forgotPassword);
route.post('/VerifyOtp',VerifyOtp);
route.post('/resetPassword',ResetPassword);
route.get('/getUserData',VerifyToken,GetUserData);
route.post('/updateUserProfileInfo',VerifyToken,updateUserProfileInfo);
route.post('/createNewPost',VerifyToken,CreateNewPost);
route.get('/searchUsers',VerifyToken,searchUsers);
route.get('/getPostToDisplayAtHomePage',VerifyToken,getPostToDisplayAtHomePage);

export { route };