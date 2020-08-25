"use strict";

var AuthRoutes = require("./auth");

var PostRoutes = require("./post");

var profileRoutes = require('./profile');

module.exports = {
  AuthRoutes: AuthRoutes,
  PostRoutes: PostRoutes,
  profileRoutes: profileRoutes
};