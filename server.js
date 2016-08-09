var express = require('express'); //routing
var morgan = require('morgan'); // log all the requests
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var ejsMate = require('ejs-mate');

var User = require('./models/user');

var app = express();
mongoose.connect('mongodb://root:abc123@ds145385.mlab.com:45385/ecommerce', function(err){
    if(err){
        console.log(err);
    } else {
        console.log("Connected to database");
    }
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

app.post('/create-user', function(req, res, next){
    var user = new User();
    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;

    user.save(function(err){
        if(err) return next(err);

        res.json('Succesfully created a new user');
    });
});

app.get('/', function(req, res){
    res.render('home');
})

app.listen(3000, function(err){
    if(err) throw err;
    console.log("Server is running");
});