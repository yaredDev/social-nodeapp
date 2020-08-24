const express = require("express");
const path = require("path");
const moment = require('moment')
const handlebars = require('express-handlebars');
const multer = require('multer')
const { AuthRoutes, PostRoutes } = require("./routes");
const morgan = require("morgan");
const expressMessages = require("express-messages");
const flash = require("connect-flash");
const expressValidator = require("express-validator");
const session = require("express-session");
const { json, urlencoded } = require("body-parser");
require("./Database");
const { APP_PORT } = require("./config");
const passport = require("passport");

// Initializing express server
const app = express();

// Configure template engine and main template file
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts/",
    extname: ".hbs",
    defaultLayout: "main",
    partialsDir: __dirname + "/views/partials",
  })
);

// Initializing handlebars template engine||Configure app to use hbs
app.set("view engine", "hbs");

// Set a path for views folder
app.set("views", path.join(__dirname, "views"));

// Tell express to allow usage of static files from 'PUBLIC' folder
app.use(express.static("src/public"));

// File upload routes
app.use(express.static('uploads/'))

// Morgan
app.use(morgan('dev'));

// Body parser
app.use(json());
app.use(urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    key: "user_sid",
    secret: "aXyr7hFL2",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  })
);

// Moment Library
moment().format()

// Express Message Middleware

// Flash messages middleware
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});


// Passport config
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.get("*", (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

/**
 * ROUTES
 */

app.use("/", AuthRoutes);
app.use('/post', PostRoutes)

// Run server
app.listen(APP_PORT, () => {
  console.log("Server is running at port ", APP_PORT);
});
