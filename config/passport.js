// Importing Passport, strategies, and config
const passport = require('passport'),
    User = require('mongoose').model('User'),
    config = require('./config'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local'),
    FacebookStrategy = require('passport-facebook');

// Setting username field to email rather than username
const localOptions = {
    usernameField: 'email'
};

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email}, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false, {error: 'Your login details could not be verified. Please try again.'});
            }

            return done(null, user);
        });
    });
});

// Setting JWT strategy options
const jwtOptions = {
    // Telling Passport to check authorization headers for JWT
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    // Telling Passport where to find the secret
    secretOrKey: config.secret

    // TO-DO: Add issuer and audience checks
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload._id, (err, user) => {
        if (err) {
            return done(err, false);
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    });
});

// passport.use('facebook', new FacebookStrategy({
//         clientID        : fbConfig.appID,
//         clientSecret    : fbConfig.appSecret,
//         callbackURL     : fbConfig.callbackUrl
//     },
//
//     // facebook will send back the tokens and profile
//     function(access_token, refresh_token, profile, done) {
//         // asynchronous
//         process.nextTick(function() {
//
//             // find the user in the database based on their facebook id
//             User.findOne({ 'id' : profile.id }, function(err, user) {
//
//                 // if there is an error, stop everything and return that
//                 // ie an error connecting to the database
//                 if (err)
//                     return done(err);
//
//                 // if the user is found, then log them in
//                 if (user) {
//                     return done(null, user); // user found, return that user
//                 } else {
//                     // if there is no user found with that facebook id, create them
//                     var newUser = new User();
//
//                     // set all of the facebook information in our user model
//                     newUser.fb.id    = profile.id; // set the users facebook id
//                     newUser.fb.access_token = access_token; // we will save the token that facebook provides to the user
//                     newUser.fb.firstName  = profile.name.givenName;
//                     newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
//                     newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
//
//                     // save our user to the database
//                     newUser.save(function(err) {
//                         if (err)
//                             throw err;
//
//                         // if successful, return the new user
//                         return done(null, newUser);
//                     });
//                 }
//             });
//         });
//     }));
passport.use(localLogin);
passport.use(jwtLogin);

