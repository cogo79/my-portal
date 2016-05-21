"use strict";

var bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordHint: DataTypes.STRING,
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNr: DataTypes.INTEGER,
    mobilePhoneNr: DataTypes.INTEGER,
    workPhoneNr: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // User.hasMany(blablabla ;D )
      }
    },
    hooks: {
      beforeCreate: function (user, options, fn) {
        beforeSave(user, options, fn);
      },
      beforeUpdate: function (user, options, fn) {
        beforeSave(user, options, fn);
      }
    }
  });

  return User;
};

var beforeSave = function (user, options, fn) {
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      console.log(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      }

      user.password = hash;
      fn(null, user);
    });
  });
};
