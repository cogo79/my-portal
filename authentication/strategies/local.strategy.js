"use strict";

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../../models/index').User,
    bcrypt = require('bcrypt');

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function (username, password, done) {
        console.log("sign in "+ username);
        User.find({
            where: {
                username: username
            }
        }).then(function(user) {
            if (user) {
                console.log("Authenticate user: ",user.dataValues);
                bcrypt.compare(password, user.dataValues.password, function(err, isMatch) {
                    if (err) {
                        console.log("Authenticate err: ", err);
                        done(null, false, {message: err.toString()});
                    }
                    if (!isMatch) {
                        console.log("Authenticate Bad password");
                        done(null, false, {message: 'Bad password'});
                    }
                    if (isMatch) {
                        console.log("???? isMatch");
                        done(null, user);
                    }
                });
            } else {
                done(null, false, {message: 'Username not found'});
            }
        });
    }));
};
