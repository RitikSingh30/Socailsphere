const express = require('express');
const bodyParser = require('body-parser');
const { route } = require('./Routes/Route');
const { DBConnection } = require('./Utiles/DBConnection');
const cors = require('cors');
require('dotenv').config() ;
const path = require('path');

// Created express server
const app = express();
const PORT = process.env.PORT || 5000 ;

// cors establision
app.use(cors({
    origin:"*",
}))

// Serving static file
app.use(express.static(path.join(__dirname,'public')));

// Increasing body size limit 
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

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



