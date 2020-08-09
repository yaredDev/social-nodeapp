const express = require("express");
const path = require("path");
const handlebars = require("express-handlebars");
const { AuthRoutes } = require("./routes");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const { json, urlencoded } = require("body-parser");
const connect_db = require("./Database");
const flashMiddleware = require("./middlewares");
const { APP_PORT, APP_SESSION } = require("./config");
// Initializing express server
const app = express();

connect_db();

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

// Morgan
app.use(morgan("dev"));

// Body parser
app.use(json());
app.use(urlencoded({ extended: false }));

// Express Session
app.use(session(APP_SESSION));

// Flash messages middleware
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

/**
 * ROUTES
 */
app.use("/", AuthRoutes);

// Run server
app.listen(APP_PORT, () => {
  console.log("Server is running at port ", APP_PORT);
});
