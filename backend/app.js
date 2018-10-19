// Importing Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initializing App
const app = express();

app.use(cors());

// Database Connection
mongoose.connect('mongodb://localhost/something', {useNewUrlParser: true, useCreateIndex: true});

let db = mongoose.connection;
db.once('open', () => {
    console.log('Connected To MongoDB');
})
db.on('error', (err) => {
    console.log(err);
})

// Adding Middlewares
app.use(bodyParser.json());


// Importing Routers
const authRouter = require('./routes/auth');


// Implementing Routes
app.use('/api/auth', authRouter);

app.use((error,req,res,next) => {
    if(error){
        console.log(error);
        res.status(500).json({
            error: error
        });
    }
    next();
});

app.use((req,res)=>{
    res.status(404).json({
        msg: "URL Not Found"
    });
})

// Listening On Port
app.listen(3000, () => {
    console.log('Server Started On Port 3000');
});