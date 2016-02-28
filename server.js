var express  	= require('express');
var morgan   	= require('morgan');
var mongoose 	= require('mongoose');
var bodyParser  = require('body-parser');
var ejs 	    = require ('ejs');
var engine    = require('ejs-mate');
var app = express();

var User = require('./models/user');
mongoose.connect('mongodb://root:abc123@ds035563.mlab.com:35563/ecommerce', function(err){
	if(err){
		console.log(err);
	} else {
		console.log('connected to database');
	}

});


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);

app.post('/create-user', function(req, res, next){
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err){
		if(err) return next(err);
		res.json('Successfully created a new user');
	});
});



app.listen(3000, function(err) {
	if (err) throw err;
	console.log("server is Running on port 3000");
});