const {
  ensureAuthenticated,
  LoginView,
  LogIn,
  Register,
  RegisterView,
  HomePage,
} = require("./auth_controller");

const { newPost, postComment } = require("./post_controller");

module.exports = {
  ensureAuthenticated,
  LoginView,
  LogIn,
  Register,
  RegisterView,
  HomePage,
  newPost,
  postComment,
};
