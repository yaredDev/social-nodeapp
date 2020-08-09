const { User } = require("../models");

const LogIn = async (req, res) => {
  const { username, password } = req.body;
  let errors = [];

  // console.log(username);

  try {
    const user = await User.findOne({ username: username });
    const isMatch = await user.matchPassword(password);

    if (username == null || password == null) {
      errors.push({ msg: "You must provide username and password to login" });
      return res.render("/login", {
        errors,
        username,
        password,
      });
    }

    if (!user && !isMatch) {
      req.flash("errors", "User does not exist");
      errors.push({ msg: "Wrong username or password" });
      res.render("/login", {
        errors,
        username,
        password,
      });
    }

    if (isMatch) {
      req.flash("success", "Login successfully");
      res.redirect("/");
    }
  } catch (err) {
    errors.push({ msg: err.message });
  }
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
  const username = req.session.username;
  res.render("home", { username: username });
};

// Export functions
module.exports = { LoginView, LogIn, Register, RegisterView, HomePage };
