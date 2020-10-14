const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

//routes
const userRoute = require('./routes/user');
const saucesRoute = require('./routes/sauces');

//database connection
mongoose.connect(process.env.MONGODB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB data base connected with success!'))
.catch(() => console.log('MongoDB data base connection has failed.'));

//initialize express in app
const app = express();

//headers & methods authorizations
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

//parse the requests
app.use(bodyParser.json());

//call the routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoute);
app.use('/api/sauces', saucesRoute);

module.exports = app;