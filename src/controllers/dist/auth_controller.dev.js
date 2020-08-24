"use strict";

var _require = require("../Database"),
    User = _require.User,
    Post = _require.Post;

var passport = require("passport");

var flash = require("connect-flash");

var ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    console.log("Not allowed to view this content");
    flash("error", "You are not logged in");
    res.redirect("/login");
  }
};

var LogIn = function LogIn(req, res, next) {
  return regeneratorRuntime.async(function LogIn$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Log in user using passport
          passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureFlash: true
          })(req, res, next);

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var LoginView = function LoginView(req, res) {
  return regeneratorRuntime.async(function LoginView$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("login");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var Register = function Register(req, res, next) {
  var _req$body, fullname, username, password, gender, email, errors, user, newUser;

  return regeneratorRuntime.async(function Register$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, fullname = _req$body.fullname, username = _req$body.username, password = _req$body.password, gender = _req$body.gender, email = _req$body.email;
          errors = [];
          if (!fullname || !username || !password || !gender || !email) errors.push({
            msg: "Fill all the fields"
          });
          if (username.length < 3) errors.push({
            msg: "Username must have at least four character"
          });
          if (password.length < 6) errors.push({
            msg: "Password is too short"
          });

          if (!(errors.length > 0)) {
            _context3.next = 9;
            break;
          }

          res.render("register", {
            errors: errors,
            fullname: fullname,
            username: username,
            password: password,
            email: email
          });
          _context3.next = 21;
          break;

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            where: {
              username: username
            }
          }));

        case 11:
          user = _context3.sent;

          if (!user) {
            _context3.next = 17;
            break;
          }

          errors.push({
            msg: "Username has taken"
          });
          res.render("register", {
            errors: errors,
            fullname: fullname,
            username: username,
            password: password,
            email: email
          });
          _context3.next = 21;
          break;

        case 17:
          _context3.next = 19;
          return regeneratorRuntime.awrap(User.create({
            fullname: fullname,
            username: username,
            password: password,
            email: email,
            gender: gender
          }));

        case 19:
          newUser = _context3.sent;

          if (newUser) {
            req.flash("success", "Successfully registered");
            res.redirect("login");
          } else {
            res.render("register");
          }

        case 21:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var RegisterView = function RegisterView(req, res) {
  return regeneratorRuntime.async(function RegisterView$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.render("register");

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Homepage controller


var HomePage = function HomePage(req, res) {
  var posts, postsArray, i, imgUrl, post;
  return regeneratorRuntime.async(function HomePage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          // req.session.user = User
          req.flash("success", "Hello");
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Post.findAll({
            include: {
              model: User,
              required: true,
              attributes: ["id", "fullname", "dp"]
            }
          }));

        case 4:
          posts = _context5.sent;
          console.log(posts.length);
          postsArray = [];

          for (i = 0; i < posts.length; i++) {
            imgUrl = "/uploads/".concat(posts[i].User.dp);
            post = {
              userId: posts[i].UserId,
              postId: posts[i].id,
              postImg: posts[i].postImg,
              content: posts[i].contentText,
              created: posts[i].createdAt,
              fullname: posts[i].User.fullname,
              username: posts[i].User.username,
              profile_pic: imgUrl
            };
            postsArray.push(post);
          }

          console.log(postsArray);
          res.render("home", {
            name: req.user.fullname,
            username: req.user.username,
            email: req.user.email,
            dp: "/uploads/".concat(req.user.dp),
            posts: postsArray
          });
          _context5.next = 15;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.log(_context5.t0);

        case 15:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 12]]);
}; // Export functions


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  LoginView: LoginView,
  LogIn: LogIn,
  Register: Register,
  RegisterView: RegisterView,
  HomePage: HomePage
};