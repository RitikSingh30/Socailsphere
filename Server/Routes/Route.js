const {Router} = require('express');
const { singupVerification, singup } = require('../Controllers/Signup');
const { SendOtp } = require('../Controllers/SendOtp');

const route = Router();

route.post('/signupVerification',singupVerification);
route.post('/signup',singup);
route.post('/sendOtp',SendOtp);

module.exports = {route};