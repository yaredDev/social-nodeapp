"use strict";

var _require = require("./auth_controller"),
    ensureAuthenticated = _require.ensureAuthenticated,
    LoginView = _require.LoginView,
    LogIn = _require.LogIn,
    Register = _require.Register,
    RegisterView = _require.RegisterView,
    HomePage = _require.HomePage;

var _require2 = require("./post_controller"),
    newPost = _require2.newPost,
    postComment = _require2.postComment;

var _require3 = require("./profile_controller"),
    profileView = _require3.profileView;

module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  LoginView: LoginView,
  LogIn: LogIn,
  Register: Register,
  RegisterView: RegisterView,
  HomePage: HomePage,
  newPost: newPost,
  postComment: postComment,
  profileView: profileView
};