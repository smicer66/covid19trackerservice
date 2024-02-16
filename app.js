var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs  = require('express-handlebars');
var mysql = require("mysql");
var validationResult = require('express-validator/check');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var gm = require('gm');
var fs = require('fs');
var http = require('http');
var util = require('util');
var knexfile   = require("./config/knexfile")
var knex       = require("knex")(knexfile)
var bookshelf = require('bookshelf')(knex);
const request = require('request');
var dotenv = require('dotenv');
var bcrypt = require('bcryptjs');
var flash = require('express-flash');
var session = require('express-session');
var cookieSession = require('cookie-session')
var slugify = require('slugify');
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
var helperdate = require('helper-date');
var javascripttimeago = require('javascript-time-ago');
var helpers = require('handlebars-helpers')();
var momentHandler = require("handlebars-helper-moment");
var contains = helpers.contains();
var arraylength = helpers.length();
var equalsLength = helpers.equalsLength();
var sum = helpers.sum();
var gt = helpers.gt();
var passport     = require('passport');
var underscore = require('underscore');
var MySQLStore = require('express-mysql-session')(session);
var cloudinary = require('cloudinary').v2;

//var moment = helpers.moment();
 
// Add the plugin
bookshelf.plugin(require('bookshelf-eloquent'));


require('./config/passport')(passport);

var app = express();

var indexRouter = require('./routes/index');


//var apiRouter = require('./routes/api');

/*Start Adjustment of auto refresh here */
app.set('port', process.env.PORT || 8080);
var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});



/*End Adjustment Here*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs(
	{
		defaultLayout: 'main',
		partialsDir: [path.join(__dirname,'/views/partials/')],
		extname: '.handlebars',
		helpers: require("./public/js/helpers.js").helpers
	})
);
app.set('view engine', 'handlebars');

//app.use(logger('dev'));
app.use(bodyParser.json({limit: '2mb'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8'));
app.set("trust proxy", 1);


var session_options = {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    //password: 'NC{ad5yh#5qU',
	password: '',
    database: 'covid19tracker',
	clearExpired: true,
	checkExpirationInterval: 900000,
	expiration: 86400000,
	createDatabaseTable: true,
	connectionLimit: 10,
	endConnectionOnClose: true,
	charset: 'utf8mb4_bin',
	schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};
//var session_connect = mysql.createConnection(session_options);
//console.log(conn);
//var sessionStore = new MySQLStore(session_options);
app.use(session({ 
  //store: sessionStore,
  key: 'id',
  secret: 'goN6DJJC6E287cC77kkdYuNuAyWnz7Q3iZj8',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: (24*60*60*1000) }
}));

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

var conn = null
app.use(function(req, res, next){
	try{
		var pool = mysql.createPool({
			host     : 'localhost',
			user     : 'root',
			//password : 'NC{ad5yh#5qU',
			password : '',
			database : 'covid19tracker'
		});
		//connection.connect();
		global.connection = pool;//.getConnection;
		//console.log(conn);
		next();
	}catch(err)
	{
		var pool = mysql.createPool({
			host     : 'localhost',
			user     : 'root',
			//password : 'NC{ad5yh#5qU',
			password : '',
			database : 'covid19tracker',
			connectionLimit: 200,
			queueLimit: 0
		});
		//connection.connect();
		global.connection = pool;//.getConnection;
		//console.log(conn);
		next();
	}
});



require("./routes/index")(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
