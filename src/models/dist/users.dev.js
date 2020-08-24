"use strict";

var _require = require("sequelize"),
    DataTypes = _require.DataTypes,
    fn = _require.fn,
    hook = _require.hook;

var bcrypt = require("bcryptjs");

module.exports = function (Database) {
  var User = Database.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "default_dp.png"
    }
  }); // Hashing password before user is created

  User.beforeCreate(function _callee(user, options) {
    var salt;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(bcrypt.genSalt(10));

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

          case 5:
            user.password = _context.sent;

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  }); // TODO Hashing updated password
  // Compare password when log in or authenticating

  User.prototype.matchPassword = function _callee2(pass) {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(bcrypt.compare(pass, this.password));

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, null, this);
  };

  return User;
};