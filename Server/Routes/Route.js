const {Router} = require('express');
const { singupVerification } = require('../Controllers/Signup');

const route = Router();

route.post('/signupVerification',singupVerification);

module.exports = {route};