const {Router} = require('express');
const { signup } = require('../Controllers/Signup');

const route = Router();

route.get('/signup',signup);

module.exports = route;