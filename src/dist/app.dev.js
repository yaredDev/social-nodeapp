"use strict";

var express = require("express");

var path = require("path");

var moment = require('moment');

var handlebars = require('express-handlebars');

var multer = require('multer');

var _require = require("./routes"),
    AuthRoutes = _require.AuthRoutes,
    PostRoutes = _require.PostRoutes,
    profileRoutes = _require.profileRoutes;

var morgan = require("morgan");

var expressMessages = require("express-messages");

var flash = require("connect-flash");

var expressValidator = require("express-validator");

var session = require("express-session");

var _require2 = require("body-parser"),
    json = _require2.json,
    urlencoded = _require2.urlencoded;

require("./Database");

var _require3 = require("./config"),
    APP_PORT = _require3.APP_PORT;

var passport = require("passport"); // Initializing express server


var app = express(); // Configure template engine and main template file

app.engine("hbs", handlebars({
  layoutsDir: __dirname + "/views/layouts/",
  extname: ".hbs",
  defaultLayout: "main",
  partialsDir: __dirname + "/views/partials"
})); // Initializing handlebars template engine||Configure app to use hbs

app.set("view engine", "hbs"); // Set a path for views folder

app.set("views", path.join(__dirname, "views")); // Tell express to allow usage of static files from 'PUBLIC' folder

app.use(express["static"]("src/public")); // File upload routes

app.use(express["static"]('uploads/')); // Morgan

app.use(morgan('dev')); // Body parser

app.use(json());
app.use(urlencoded({
  extended: false
})); // Express Session

app.use(session({
  key: "user_sid",
  secret: "aXyr7hFL2",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
})); // Moment Library

moment().format(); // Express Message Middleware
// Flash messages middleware

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
}); // Passport config

require("./config/passport")(passport);

app.use(passport.initialize());
app.use(passport.session()); // Global variables

app.get("*", function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});
/**
 * ROUTES
 */

app.use("/", AuthRoutes);
app.use('/post', PostRoutes);
app.use("/profile", profileRoutes); // Run server

app.listen(APP_PORT, function () {
  console.log("Server is running at port ", APP_PORT);
});