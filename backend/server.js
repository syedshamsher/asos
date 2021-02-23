const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const shoppingRoute = require('./routes/shopping')
const responseTime = require('response-time');

const server = express();
server.use(express.json());
server.use(cors());
server.use(responseTime());
dotenv.config();

//connection to dataBase
mongoose.connect(process.env.MONGO_ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
    if(err) {
        console.log( 'Error connecting to database' );
    }
    else {
        console.log( 'Database Successfully connected' );
    }
})

server.use('/asos', shoppingRoute)

server.listen(5000, () => {
    console.log("server is up and running");
})