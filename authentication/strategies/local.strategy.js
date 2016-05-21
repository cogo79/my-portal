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
                bcrypt.compare(password, user.dataValues.password, function(err, isMatch) {
                    if (err) {
                        done(null, false, {message: err.toString()});
                    }
                    if (!isMatch) {
                        done(null, false, {message: 'Bad password'});
                    }
                    if (isMatch) {
                        done(null, user);
                    }
                });
            } else {
                done(null, false, {message: 'Username not found'});
            }
        });
    }));
};
