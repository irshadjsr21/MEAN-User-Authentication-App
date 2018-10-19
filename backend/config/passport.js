const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const bcrypt = require('bcryptjs');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            
            // bcrypt.compare(password, user.password, (err, result) => {
            //     if(err)
            //         return done(null, false);
            //     else if(result)
            //         return done(null, user);
            //     else
            //         return done(null, false);
            // })
            user.verifyPassword(password, (err, isMatch) => {
                if (!isMatch) { return done(null, false); }
                return done(null, user);
            });
        });
    }
    ));