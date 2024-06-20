const {Router} = require('express');
const { singupVerification, singup } = require('../Controllers/Signup');
const { SendOtp } = require('../Controllers/SendOtp');
const { loginVerification } = require('../Controllers/Login');
const {forgotPassword } = require('../Controllers/ForgotPassword');
const route = Router();

route.post('/signupVerification',singupVerification);
route.post('/signup',singup);
route.post('/sendOtp',SendOtp);
route.post('/login',loginVerification);
route.post('/forgotPassword',forgotPassword);

module.exports = {route};