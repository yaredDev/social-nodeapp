const { User } = require("../models");
const passport = require("passport");
const flash = require("connect-flash");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("Not allowed to view this content");
    flash("error", "You are not logged in");
    res.redirect("/login");
  }
};

const LogIn = async (req, res, next) => {
  // Log in user using passport
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const LoginView = async (req, res) => {
  res.render("login");
};

const Register = async (req, res, next) => {
  const { fullname, username, password, gender, email, chkbox } = req.body;
  const errors = [];

  if (!fullname || !username || !password || !gender || !email)
    errors.push({ msg: "Fill all the fields" });

  if (username.length < 3)
    errors.push({ msg: "Username must have atleast four character" });

  if (password.length < 6) errors.push({ msg: "Password is too short" });

  // if (!chkbox)
  //   errors.push({ msg: "You must agree to the terms and conditions" });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      fullname,
      username,
      password,
      email,
      chkbox,
    });
  } else {
    const user = await User.findOne({ username: username });
    if (user) {
      errors.push({ msg: "Username has taken" });
      res.render("register", {
        errors,
        fullname,
        username,
        password,
        email,
        chkbox,
      });
    } else {
      await User.create(
        {
          name: fullname,
          username: username,
          password: password,
          email: email,
          gender: gender,
        },
        (err, user) => {
          if (err) return next(err);
          else {
            req.flash("success", "You are now registered, Login");
            res.redirect("/login");
          }
        }
      );
    }
  }
};

const RegisterView = async (req, res) => {
  res.render("register");
};

// Homepage controller
const HomePage = async (req, res) => {
  // req.session.user = User
  console.log(req.session.user);
  console.log("Home page", req.sessionID);
  console.log(req.session);
  req.flash("success", "Hello");
  res.render("home", {
    name: req.user.name,
    username: req.user.username,
    email: req.user.email,
  });
};

// Export functions
module.exports = {
  ensureAuthenticated,
  LoginView,
  LogIn,
  Register,
  RegisterView,
  HomePage,
};
