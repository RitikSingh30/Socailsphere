const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('./Routes/Route');
const { DBConnection } = require('./Utiles/DBConnection');
require('dotenv').config() ;

// Created express server
const app = express();
const PORT = process.env.PORT || 5000 ;

// Parsing the data 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// All router will be directed here 
app.use('/user/v1',route);

// Mongobd connection established
DBConnection();

// Listing app at 3000 port
app.listen(PORT,(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
});