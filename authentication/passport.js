"use strict";
var passport = require('passport');
var User = require('../models/index').User;

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    console.log("passport.js");
    passport.serializeUser(function (user, done) {
    	console.log("serializeUser", user);
        done(null, user.dataValues.id);
    });

    passport.deserializeUser(function (userId, done) {
    	console.log("deserializeUser", userId);
        User.findOne({
            where: {
                id: userId
            }
        }).then(function(userResult) {
            console.log("userResult.dataValues: ", userResult.dataValues);
            done(null, userResult.dataValues);
        });
    });

    require('./strategies/local.strategy')();

};