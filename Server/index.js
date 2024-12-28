import express from 'express';
import bodyParser from 'body-parser';
import { route } from './Routes/Route.js';
import { DBConnection } from './Utiles/DBConnection.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

// Created express server
const app = express();
const PORT = process.env.PORT || 5000 ;

// Created http server
const server = http.createServer(app);

// cors establision
// TODO : Change the origin to the domain name of the frontend
app.use(cors({
    origin:"*",
}))

// Created socket connection
// TODO : Change the origin to the domain name of the frontend
const io = new Server(server,{
    cors:{
        origin:"*",
    }
});


// Serving static file
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

// Increasing body size limit 
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Parsing the data 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// All router will be directed here 
app.use('/user/v1',route);

// Mongobd connection established
DBConnection();

// Listing app at 3000 port
server.listen(PORT,(error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port " + PORT)
    else 
        console.log("Error occurred, server can't start", error);
});



