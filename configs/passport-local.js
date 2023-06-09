const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../schemas/users');
var auth = false;

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    },
    function(req, email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  {
            if (err){
                //res.flash('error', err);
                console.log("err in passport-local.js",err);
                return done(err);
            }

            if (!user || user.password != password){
                console.log('error', 'Invalid Username/Password');
                return done(null, false);
            }
            console.log(user);
            auth = true;
            return done(null, user);
        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(id, done){
    done(null, user._id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    console.log(req.isAuthenticated());
        //if the user is signed in, then pass on the request to the next function(controller's action)
        if (req.isAuthenticated()){
       return next();
    }

    // if the user is not signed in
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;