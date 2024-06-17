const {Router} = require('express');
const { singupVerification, singup } = require('../Controllers/Signup');

const route = Router();

route.post('/signupVerification',singupVerification);
route.post('/signup',singup);

module.exports = {route};