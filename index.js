const express = require('express');
var launcher = require( 'browser-launcher3' );
const db = require('./configs/mongoose');
const app = express();
const port = 8000;
//cookie and session
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./configs/passport-local');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'));

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'TODO',
    secret: '1209',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled',
            collection : 'sessions'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb successful');
        }
    )
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
launcher( function( err, launch ) {
	if ( err ) {
		return console.error( err );
	}

	launch( `http://localhost:${port}`, 'chrome', function( err, instance ) {
		if ( err ) {
			return console.error( err );
		}

		console.log( 'Instance started with PID:', instance.pid );

		instance.on( 'stop', function( code ) {
			console.log( 'Instance stopped with exit code:', code );
		} );
	} );
} );