var express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var morgan = require('morgan'); //To see requests in the server
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');


mongoose.connect(config.database, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true})
    .then(() =>{
        console.log("MongoDB database connection established succesfully");
    })
    .catch((err)=>{
        console.log("Cannot connect to the database! :(", err);
        process.exit();
    });


//APP CONFIGURATION

//grab information from POST requests
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//configure app to handle CORS requests

app.use(cors());

//log all requests to the console
app.use(morgan('dev'));

//static files location
app.use(express.static(__dirname+'/public'));

//API ROUTES
var apiRoutes = require('./routes/api')(app,express);
app.use('/api', apiRoutes);

/*
app.get('*', function(req, res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
});*/

//START SERVER
app.listen(config.port);
console.log('Server started on ', config.port);