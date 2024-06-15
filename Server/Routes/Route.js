const {Router} = require('express');
const { signup } = require('../Controllers/Signup');

const route = Router();

route.post('/signup',signup);

module.exports = {route};