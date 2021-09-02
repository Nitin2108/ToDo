const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require("../config/google.config");
const db = require("../models");
const User = db.users;

module.exports = function () {

    passport.use(
        new GoogleStrategy({
            clientID: keys.clientID,
            clientSecret: keys.clientSecret,
            callbackURL: '/auth/google/redirect'
        }, (accessToken, refreshToken, profile, done) => {
            // passport callback function
            console.log("profile" + profile)
            //check if user already exists in our db with the given email ID

            User.findOne({ where: { email: profile.emails[0].value, strategy: 'google' } }).then((currentUser) => {
                if (currentUser) {
                    //if we already have a record with the given email ID
                    done(null, currentUser);
                } else {
                    //if not, create a new user 
                    User.create({
                        email: profile.emails[0].value,
                        strategy: 'google'
                    }).then((newUser) => {
                        done(null, newUser);
                    });
                }
            })
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.findByPk(id.email).then(user => {
            done(null, user);
        });
    });
}