const { User, Post } = require("../Database");
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
  const { fullname, username, password, gender, email } = req.body;
  const errors = [];

  if (!fullname || !username || !password || !gender || !email)
    errors.push({ msg: "Fill all the fields" });

  if (username.length < 3)
    errors.push({ msg: "Username must have at least four character" });

  if (password.length < 6) errors.push({ msg: "Password is too short" });

  if (errors.length > 0) {
    res.render("register", {
      errors,
      fullname,
      username,
      password,
      email,
    });
  } else {
    const user = await User.findOne({ where: { username: username } });
    if (user) {
      errors.push({ msg: "Username has taken" });
      res.render("register", {
        errors,
        fullname,
        username,
        password,
        email,
      });
    } else {
      const newUser = await User.create({
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        gender: gender,
      });

      if (newUser) {
        req.flash("success", "Successfully registered");
        res.redirect("login");
      } else {
        res.render("register");
      }
    }
  }
};

const RegisterView = async (req, res) => {
  res.render("register");
};

// Homepage controller
const HomePage = async (req, res) => {
  // req.session.user = User
  req.flash("success", "Hello");


  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        required: true,
        attributes: ['id', 'fullname'],
        where: {
          id:6
        }
      }
    })
    console.log(posts.length)

    let postsArray = [];

    for (let i = 0; i < posts.length; i++) {

      let post = {
        userId: posts[i].UserId,
        postId: posts[i].id,
        postImg: posts[i].postImg,
        content: posts[i].contentText,
        created: posts[i].createdAt,
        fullname: posts[i].User.fullname,
        username: posts[i].User.username,
        profile_pic: posts[i].User.dp,
      };
      postsArray.push(post)
    }
    console.log(postsArray)
     res.render("home", {
       name: req.user.fullname,
       username: req.user.username,
       email: req.user.email,
       dp: req.user.dp,
       posts: postsArray,
     });
    
  } catch (err) {
    console.log(err)
    
  }
 
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
