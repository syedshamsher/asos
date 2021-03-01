const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const shoppingRoute = require('./routes/shopping')
const responseTime = require('response-time');
const path = require("path");

const server = express();
server.use(express.json());
server.use(cors());
server.use(responseTime());
dotenv.config();

//connection to dataBase
mongoose.connect(process.env.MONGO_ATLAS_URI || 'development', {
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

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log("server is up and running");
})

// rendering front-end
const routes=['/','/auth','/user/profile','/men','/women','/query','/men/:product_id','/women/:product_id','/cart','/contact','/cart/checkout']
routes.map(route=>server.get(route,(req,res)=>{res.sendFile(path.join(__dirname,'..', 'frontend','build','index.html'));}))
routes.map(route=>server.use(route,express.static(path.join(__dirname, '..', 'frontend','build'))))
